import { auth } from "config/client";
import {
	ActionCodeSettings,
	sendSignInLinkToEmail,
	isSignInWithEmailLink,
	signInWithEmailLink,
	signOut,
} from "firebase/auth";
import { getAndUpdateUserData } from "server-actions/users";

/**
 * Function will send the passwordless login email to the user's email
 *
 * @export
 * @param {string} email
 * @return {*}  {Promise<void>}
 */
export async function sendPasswordlessLoginEmail(
	email: string
): Promise<void> {
	const actionCodeSettings: ActionCodeSettings = {
		handleCodeInApp: true,
		// dynamicLinkDomain: process.env.NEXT_PUBLIC_DYNAMIC_LINKS_DOMAIN,
		// URL must be whitelisted in the Firebase Console.
		url:
			process.env.NEXT_PUBLIC_DYNAMIC_LINK_URL ||
			"http://localhost:3000/",
		iOS: {
			bundleId: "io.maet.mobile",
		},
		android: {
			packageName: "io.maet.mobile",
			installApp: true,
			// minimumVersion: '8',
		},
	};
	await sendSignInLinkToEmail(auth, email, actionCodeSettings);
}

export /**
 * Function will sign in with the email link
 *
 * @param {string} email
 * @param {string} [link]
 * @return {*}
 */
const signInWithLink = async (email: string | null, link: string) => {
	if (!isSignInWithEmailLink(auth, link))
		throw Error(`Not Email Sign in Link: ${link}`);

	if (!email)
		throw Error(`Not valid email: ${email}`);
	
	// get user credential and sign in with firebase
	const userCredential = await signInWithEmailLink(auth, email, link);
	
	// get the id token from firebase
	const idTokenResult = await userCredential.user.getIdTokenResult();

	// set the cookie with firebase auth edge middleware
	// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
	await fetch("/api/login", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${idTokenResult.token}`,
		},
	});

	// initialize the user data
	await getAndUpdateUserData({ email: userCredential.user.email, emailVerified: userCredential.user.emailVerified });

	// return the user credential
	return userCredential;
};
/**
 * Sign out the current user
 * https://firebase.google.com/s/#signout
 * @export
 * @return {*}  {Promise<void>}
 */
export async function signOutUser(): Promise<void> {
	// sign out the current user
	await signOut(auth);

	// Remove authentication cookies for firebase auth edge
	// https://github.com/awinogrodzki/next-firebase-auth-edge#example-authprovider
	await fetch("/api/logout", {
		method: "GET",
	});
}