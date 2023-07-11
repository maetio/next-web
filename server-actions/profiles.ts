"use server";

import { InitialRating, NullRating } from "constants/rating";
import { Competition, CompetitionProfile, PrivateUserData, Profile, Team } from "types/index";
import { competitionProfilesSubcollection, profileCollection } from "config/server";
import { BaseURL } from "config/constants";
import { CompetitionsResponseType, PlayerResponseType } from "types/next-api";

export /**
 * Function will fetch the profile
 *
 * @param {string} userID
 * @param {Profile["sport"]} sport
 * @param {Profile["type"]} type
 * @return {*} 
 */
const getProfile = async (
	userID: string,
	sport: Profile["sport"] | string,
	type: Profile["type"],
) => {
	// fetch the player
	const querySnapshot = await profileCollection.where("userID", "==", userID).where("sport", "==", sport).where("type", "==", type).orderBy("rating.numGames", "desc").limit(1).get();
	return querySnapshot.docs.at(0);
};

/**
 * Function will create a profile for the user if it does not exist, otherwise will fetch if it does
 *
 * @export
 * @param {PrivateUserData} user
 * @param {Profile['sport']} sport
 * @param {Profile['type']} type
 * @return {*}  {(Promise<{ id: string } & Partial<Profile>>)}
 */
export const getOrCreateProfile = async (
	user: { id: string } & Partial<PrivateUserData> | undefined,
	sport: Profile["sport"],
	type: Profile["type"],
): Promise<{ id: string; userID: string } & Partial<Profile>> => {
	// check if user id exists
	if (!user?.id) throw Error("Need user id");

	// get initial profile
	const profileDoc = await getProfile(user?.id, sport, type);
	const profile = profileDoc?.data();

	// make a profile for this if it is not generated
	if (!profileDoc?.id) {
		const newProfile: { userID: string } & Omit<Profile, "id"> = {
			firstName: user?.firstName || null,
			lastName: user?.lastName || null,
			image: user?.image || null,
			userID: user.id,
			type,
			sport,
			rating: InitialRating,
			deltaRating: NullRating,
		};
		const docRef = await profileCollection.add(newProfile);
		return { id: docRef.id, ...newProfile };
	}
	return { ...profile, userID: user.id, id: profileDoc.id };
};

export /**
 * Function will add a competition profile to the database
 *
 * @param {string} competitionID
 * @param {Competition["sport"]} sport
 * @param {string} profileID
 * @param {{
 * 		id?: Team["id"];
 * 		firstName?: Team["firstName"],
 * 		lastName?: Team["lastName"],
 * 	}} [teamInfo]
 * @return {*} 
 */
const addCompetitionProfile = async (
	competitionID: string,
	sport: Competition["sport"],
	profileID: string,
	teamInfo?: {
		id?: Team["id"];
		firstName?: Team["firstName"],
		lastName?: Team["lastName"],
	},
) => {
	// get initial profile
	const profileResponse = await fetch(`${BaseURL}/player/${profileID}/${sport}`);
	const profileData: PlayerResponseType = await profileResponse.json();

	// add the profile to the competition
	const competitionProfile: CompetitionProfile = {
		firstName: profileData.firstName || null,
		lastName: profileData.lastName || null,
		image: profileData.image || null,
		userID: profileData.userID || profileID,
		type: "player",
		sport,
		deltaRating: profileData.deltaRating,
		// current rating of the profile
		rating: profileData.rating || InitialRating,
		...profileData,
		teamID: teamInfo?.id || null,
		profileID,
		competitionID,
		competitionEndTimeISO: null,
		teamFirstName: teamInfo?.firstName || null,
		teamLastName: teamInfo?.lastName || null,
	};
	competitionProfilesSubcollection(competitionID).doc(profileID).set(competitionProfile, { merge: true });

	// get the competition
	return competitionProfile;
};