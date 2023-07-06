import { getApps, initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

export const clientConfig = {
	redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const allApps = getApps();
export const app =
	allApps.length === 0 ? initializeApp(clientConfig) : allApps[0];
export const auth = initializeAuth(app);