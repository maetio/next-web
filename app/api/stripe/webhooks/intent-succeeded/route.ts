import { BaseURL } from "config/constants";
import {
	competitionProfilesSubcollection,
	competitionsCollection,
} from "config/server";
import { InitialRating } from "constants/rating";
import { Timestamp } from "firebase-admin/firestore";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { PlayerResponseType } from "types/next-api";
import { CompetitionProfile } from "types/profile";

// grab envs as string
const STRIPE_SECRET = process.env.STRIPE_SECRET as string;

const STRIPE_ENDPOINT_SECRET_INTENT_SUCCEEDED = process.env
	.STRIPE_ENDPOINT_SECRET_INTENT_SUCCEEDED as string;

// initialize stripe
const stripe = new Stripe(STRIPE_SECRET, {
	apiVersion: "2022-11-15",
});

/**
 * Stripe webhook that adds profile to the competition after payment
 * stripe handles all the listeners, and just calls this api when the "payment_intent.succeeded" event fires
 *
 * @Docs
 * https://dashboard.stripe.com/test/webhooks/create
 *
 * @export
 * @param {NextRequest} req
 * @return {*}
 */
export async function POST(req: NextRequest) {
	const origin = req.headers.get("origin");

	const sig = req.headers.get("stripe-signature");

	try {
		const body = await req.text();
		if (sig) {
			// get the event
			const event = stripe.webhooks.constructEvent(
				body,
				sig,
				STRIPE_ENDPOINT_SECRET_INTENT_SUCCEEDED
			);

			// check what type of event it is
			if (event && event.type === "payment_intent.succeeded") {
				// grab the important information about this event
				const paymentIntentSucceeded = event.data
					.object as Stripe.Response<Stripe.PaymentIntent>;
				// grab the metaData that is added when the payment intend is created in the client(/server-actions/stripe.ts)
				const { userID, compID } = paymentIntentSucceeded.metadata;
				const compInfoRef = await competitionsCollection
					.doc(compID)
					.get();
				const compInfo = compInfoRef.data();

				// get initial profile
				const profileResponse = await fetch(
					`${BaseURL}/api/player/${userID}/${compInfo?.sport}`
				);
				const profileData: PlayerResponseType =
					await profileResponse.json();

				// create the competition profile
				if (
					profileData &&
					profileData.userID &&
					compInfo?.endTimestamp &&
					typeof paymentIntentSucceeded.latest_charge === "string"
				) {
					// add the profile to the competition
					const competitionProfile: CompetitionProfile & {
						endTimeStamp: Timestamp;
					} = {
						firstName: profileData.firstName || null,
						lastName: profileData.lastName || null,
						image: profileData.image || null,
						userID: profileData.userID || userID,
						type: "player",
						sport: compInfo?.sport || "basketball",
						deltaRating: profileData.deltaRating,
						rating: profileData.rating || InitialRating,
						...profileData,
						teamID: null,
						profileID: profileData.id,
						competitionID: compID,
						competitionEndTimeISO: null,
						teamFirstName: null,
						teamLastName: null,
						stripeChargeID: paymentIntentSucceeded.latest_charge,
						endTimeStamp: compInfo.endTimestamp as Timestamp, // need to change to create a new timestamp
					};
					await competitionProfilesSubcollection(compID)
						.doc(profileData.id)
						.set(competitionProfile, { merge: true });
				}
			}
		}
		return new NextResponse(
			JSON.stringify({
				message: "webhook completed",
			}),
			{
				status: 200,
				headers: {
					"Access-Control-Allow-Origin": origin || "",
					"Content-Type": "application/json",
				},
			}
		);
	} catch (err: any) {
		NextResponse.json({ received: false, message: err });
	}
}
