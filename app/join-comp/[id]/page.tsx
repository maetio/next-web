import React from "react";
import { CompetitionsResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import {
	addCompetitionProfile,
	getOrCreateProfile,
} from "server-actions/profiles";
import { redirect } from "next/navigation";

/**
 * Screen will join the competition for the user
 *
 * @export
 * @param {{ params: { id: string } }} { params }
 * @return {*}
 */
export default async function JoinCompScreen({
	params,
}: {
	params: { id: string };
}) {
	// get the user data
	const user = await getUserData();

	// get competition data
	const competitionResponse = await fetch(
		`${BaseURL}/api/competitions/${params.id}`
	);
	const competitions: CompetitionsResponseType =
		await competitionResponse.json();
	const competitionData = competitions?.at(0);

	// get the profile data for the user
	const profileData = user?.id
		? await getOrCreateProfile(
			user,
			competitionData?.sport || "basketball",
			"player"
		  )
		: null;

	if (profileData?.id) redirect(`/confirm-comp/${params.id}`);

	/**
	 * Define the submitting form action
	 *
	 * @param {FormData} data
	 */
	// const submitFormAction = async () => {
	// 	"use server";

	// 	try {
	// 		// update the data with the server action
	// 		if (profileData?.id) {
	// 			await addCompetitionProfile(
	// 				params.id,
	// 				competitionData?.sport || "basketball",
	// 				profileData?.id
	// 			);
	// 			redirect(`/confirm-comp/${params.id}`);
	// 		}
	// 		console.log('after without profiel data');
	// 	} catch (e: any) {
	// 		console.warn("error with form action", e);
	// 	}
	// 	console.log('joingin competition');
	// };

	return (
		<main>
			<h1>Competition Name: {competitionData?.name}</h1>
			<br />
			<h3>Loading...</h3>
			{/* <h3>
				Join the competition as {profileData?.firstName}{" "}
				{profileData?.lastName}
			</h3>
			<h3>Rating: {profileData?.rating?.displayRating}</h3>
			<h3>Sport: {profileData?.sport}</h3>
			<br /> */}
			{/* <form action={submitFormAction}>
				<button type="submit">Join Competition</button>
			</form> */}
		</main>
	);
}
