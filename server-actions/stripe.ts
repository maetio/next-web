"use server";

// import { revalidatePath } from "next/cache";
import {
	competitionsCollection,
	privateUserCollection,
	transactionEvents,
} from "config/server";
import { getServerAuthUser } from "auth/server";
import Stripe from "stripe";
import { Timestamp } from "firebase-admin/firestore";
import { TransactionEvents } from "types/stripe";

// get stripe
const stripe = process.env.STRIPE_SECRET
	? new Stripe(process.env.STRIPE_SECRET, {
			apiVersion: "2022-11-15",
	  })
	: undefined;

const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY as string;

/**
 * generates the stripe session that is used for the checkout form
 *
 * @export
 * @param {(string | undefined)} compID
 * @return {*}
 */
// eslint-disable-next-line consistent-return
export async function getStripeSession(compID: string | undefined) {
	// get the user for the server
	const user = await getServerAuthUser();

	// handle if there is no user
	if (!user) {
		throw new Error("Cannot checkout for unauthenticated user");
	}

	if (!compID) {
		throw new Error("No ccompetion ID provided");
	}

	try {
		const privateUserDataRef = await privateUserCollection
			.doc(user.id)
			.get();
		const privateUserData = privateUserDataRef.data();

		let customerID: string;

		// create or use existing customer ID
		if (privateUserData?.stripeCustomerID) {
			customerID = privateUserData?.stripeCustomerID;
		} else {
			const createdCustomer = await stripe?.customers.create();
			customerID = createdCustomer?.id || "";
			await privateUserCollection
				.doc(user.id)
				.update({ stripeCustomerID: customerID });
		}

		// get the competition information from firestore. Although convenient, we DO NOT send this information in the body of the response.
		// This is becuase it could be manipulated from the frontend to change the price of a competition
		const competitionCollectionRef = competitionsCollection.doc(compID);
		const competitionData = (await competitionCollectionRef.get()).data();

		if (competitionData?.price && competitionData.hostID) {
			// all the commented out code below is 100% needed. Currently the destination(where the payment is going to) is hard coded.
			// This is because, the fake data gnerators, don't include hostIDs for the private-user-data.
			// down below I have the needed code to get the host stripeID from firestore and we check to make sure we have it before running the 'stripe?.ephemeralKeys.create'

			// get the host private-user-data
			const hostInformationRef = privateUserCollection.doc(
				competitionData.hostID
			);
			const hostInformation = (await hostInformationRef.get()).data();

			if (hostInformation?.stripeHostID) {
				// const customer = await stripe?.customers.create();
				const ephemeralKey = await stripe?.ephemeralKeys.create(
					{ customer: customerID },
					{ apiVersion: "2022-11-15" }
				);
				const paymentIntent = await stripe?.paymentIntents.create({
					// we will use this meta data to store the user ID, and comp ID. This will allow the paymentIntent webhook to have this information, so we can allow the user access to the competition.
					// without this, there is not enough inforation to make these changes to the user.
					metadata: {
						compID,
						userID: user.id,
					},

					amount: competitionData.price,

					currency: "usd",
					customer: customerID,
					automatic_payment_methods: {
						enabled: true,
					},
					// currently Maet is taking 1% of the transaction
					application_fee_amount: Math.ceil(
						competitionData.price * 0.1
					),
					transfer_data: {
						// destination: "acct_1NXrkNCHexTeDnP1",
						destination: hostInformation.stripeHostID,
					},
				});

				const transactionEventData = {
					userID: user.id,
					eventType: 604,
					timeStamp: Timestamp.now(),
					actionID: paymentIntent?.id,
					customerID: paymentIntent?.customer,
					destinationAccount:
						paymentIntent?.transfer_data?.destination,
					latest_charge: paymentIntent?.latest_charge,
					amount: paymentIntent?.amount,
					amountFee: paymentIntent?.application_fee_amount,
				};

				await transactionEvents.add(transactionEventData);

				const stripeSession = {
					paymentIntentSecret: paymentIntent?.client_secret,
					paymentIntent,
					ephemeralKey: ephemeralKey?.secret,
					customer: customerID,
					publishableKey,
				};

				return stripeSession;
			}
		}
	} catch (e) {
		throw new Error(`error has occured: ${e}`);
	}

	// revalidatePath("/");
}

/**
 * server action that takes in a transaction event and adds it to the transactionEvents collection
 *
 * @export
 * @param {(string | undefined)} compID
 * @return {*}
 */
// eslint-disable-next-line consistent-return
export async function addTransactionEvent(
	transactionEvent: Partial<TransactionEvents>
) {
	// get the user for the server
	const user = await getServerAuthUser();

	// handle if there is no user
	if (!user) {
		throw new Error("Cannot checkout for unauthenticated user");
	}

	if (!transactionEvent) {
		throw new Error("No trnsaction event provided");
	}

	try {
		const transaction = {
			...transactionEvent,
			Timestamp: Timestamp.now(),
			userID: user.id,
		};

		await transactionEvents.add(transaction);

		return "success";
	} catch (e) {
		throw new Error(`error has occured: ${e}`);
	}

	// revalidatePath("/");
}
