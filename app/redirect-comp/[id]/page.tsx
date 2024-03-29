import React from "react";
import { CompetitionsResponseType } from "types/next-api";
import { BaseURL } from "config/constants";
import { getUserData } from "server-actions/users";
import { getOrCreateProfile } from "server-actions/profiles";
import { redirect } from "next/navigation";
import SkeletonCard from "app/components/cards/skeleton-card";

/**
 * Screen will join the competition for the user
 *
 * @export
 * @param {{ params: { id: string } }} { params }
 * @return {*}
 */
export default async function RedirectComp({
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

	if (profileData?.id) redirect(`/join-comp/${params.id}`);

	return (
		<main>
			<h1>Competition Name: {competitionData?.name}</h1>
			<br />
			{user?.email ? (
				<h3>Loading account for {user?.email}</h3>
			) : (
				<div>
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
				</div>
			)}
		</main>
	);
}
