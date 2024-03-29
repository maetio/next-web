/**
 * Environmental variables configuration, used in the firebase-config file
 * Uses the react-native-dotenv package: https://www.npmjs.com/package/react-native-dotenv
 */
declare module "@env" {
	export const FIREBASE_API_KEY: string;
	export const FIREBASE_AUTH_DOMAIN: string;
	export const FIREBASE_PROJECT_ID: string;
	export const FIREBASE_STORAGE_BUCKET: string;
	export const FIREBASE_MESSAGING_SENDER_ID: string;
	export const FIREBASE_APP_ID: string;
	export const FIREBASE_MEASUREMENT_ID: string;
	export const GOOGLE_API_KEY: string;
	export const ALGOLIA_APP_ID: string;
	export const ALGOLIA_SEARCH: string;
	export const STRIPE_PUBLISHABLE_KEY: string;
	export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
	export const STRIPE_HTTP_LINK: string;
	export const STRIPE_MERCHANT_ID: string;
	export const DYNAMIC_LINKS_DOMAIN: string;
}
