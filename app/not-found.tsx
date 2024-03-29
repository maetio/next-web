/**
 * Not found screen for when the user navigates to a screen/page that does not exist in our app
 *
 * @export
 * @return {*}
 */
export default async function NotFound() {
	return (
		<main className="flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8">
			<p className="text-base font-semibold leading-8 text-indigo-600">
				404
			</p>
			<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
				Page not found
			</h1>
			<p className="mt-6 text-base leading-7 text-gray-600">
				Sorry, we could not find the page you&apos;re looking for.
			</p>
			<div className="mt-10">
				<a
					href="/"
					className="text-sm font-semibold leading-7 text-indigo-600"
				>
					<span aria-hidden="true">&larr;</span> Back to home
				</a>
			</div>
		</main>
	);
}
