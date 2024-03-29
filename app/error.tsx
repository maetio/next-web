"use client";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-indigo-600">
					{error.name}
				</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					Something went wrong
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					{error.message}
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/"
						className="text-sm font-semibold leading-7 text-indigo-600"
					>
						<span aria-hidden="true">&larr;</span> Back to home
					</a>

					<button
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={() => reset()}
					>
						Try again
					</button>
				</div>
				<div className="mt-5">
					<a href="#" className="text-sm font-semibold text-gray-900">
						Contact support
					</a>
				</div>
			</div>
		</main>
	);
}
