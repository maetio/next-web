import { MaetIcon } from "app/components/icons";
import { createEmailPassword } from "auth/client";
import { getUserData, updateUserData } from "server-actions/users";

/**
 * Define the submitting form action
 *
 * @param {FormData} data
 */
const submitFormAction = async (data: FormData) => {
	"use server";

	// get the email and the password
	const email = data?.get("email")?.toString();
	const password = data?.get("password")?.toString();

	// create account
	await createEmailPassword(email, password);

	// get the data
	const firstName = data?.get("firstName")?.toString();
	const lastName = data?.get("lastName")?.toString();

	// update the data with the server action
	await updateUserData({ firstName, lastName });
};

/**
 * Server component that displays the profile screen
 *
 * @export
 * @return {*}
 */
export default async function Profile() {
	// fetch the user data
	const userData = await getUserData();

	return (
		<>
			<div className="flex h-full min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<MaetIcon
						size={10}
						className="align-center mx-auto w-20 justify-center"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create your account.
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action={submitFormAction}>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email
							</label>
							<div className="mt-2">
								<input
									required
									type="text"
									name="email"
									placeholder="Enter your email"
									autoComplete="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Enter your password
							</label>
							<div className="mt-2">
								<input
									required
									type="password"
									name="password"
									placeholder="Enter your password"
									autoComplete="password"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								First Name
							</label>
							<div className="mt-2">
								<input
									required
									type="text"
									name="firstName"
									placeholder={
										userData?.firstName ||
										"Enter your first name"
									}
									autoComplete="firstName"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Last Name
								</label>
							</div>
							<div className="mt-2">
								<input
									id="lastName"
									type="text"
									name="lastName"
									placeholder={
										userData?.lastName ||
										"Enter your last name"
									}
									autoComplete="lastName"
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
