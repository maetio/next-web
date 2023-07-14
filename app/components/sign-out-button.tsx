"use client";

import React, { useTransition } from "react";
import { signOutUser } from "auth/client";
import { useRouter } from "next/navigation";
import { getUserData } from "server-actions/users";

export /**
 * Will have the home screen render
 *
 * @return {*}
 */
const SignOutButton = () => {
	// get router
	const router = useRouter();

	// get transition state
	const [isPending, startTransition] = useTransition();

	// handle click with button
	const handleClick = async () => {
		// sign out user and route to home
		await signOutUser();

		// invoke another call for the user data to update
		startTransition(() => {
			getUserData();
		});

		// route to home
		router.push("/");
	};

	return (
		<button
			disabled={isPending}
			onClick={() => handleClick()}
			className="max-w-xs rounded-2xl border-2 border-solid border-black bg-red-500 p-2 text-xl text-black hover:cursor-pointer hover:bg-red-400"
		>
			{isPending ? "Loading..." : "Sign Out"}
		</button>
	);
};
