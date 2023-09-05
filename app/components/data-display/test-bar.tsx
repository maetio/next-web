"use client";

import React, { useEffect, useState } from "react";

export const CircularProgressBar = ({ number }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (progress < number) {
				setProgress((prevProgress) => prevProgress + 1);
			} else {
				clearInterval(interval);
			}
		}, 50); // Adjust the interval to control the animation speed

		return () => clearInterval(interval);
	}, [number, progress]);

	const radius = 40; // Adjust the radius of the circle
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (progress / 100) * circumference;

	return (
		<div className="relative h-20 w-20">
			<svg className="h-full w-full">
				<circle
					className="stroke-current stroke-2 text-transparent"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					r={radius}
					cx="50%"
					cy="50%"
				/>
			</svg>
			<div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
				{progress}%
			</div>
		</div>
	);
};
