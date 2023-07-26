import React from "react";
import { FaPlay } from "react-icons/fa6";
import { inferGameStatus } from "utils/skill-rating";
import { BaseURL } from "config/constants";
// import { GameResponseType } from "types/next-api";
import { GameResponseType } from "types/next-api";
import { getShortDateString, getTimeString } from "utils/date";
import { XSGrayMaetIcon } from "../icons";

// modular props for all competition cards
export interface GameCardProps
	extends Omit<
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>,
		"color"
	> {
	id?: string;
	verified?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export /**
 * Card that renders game data upon game completion
 *
 * @param {*} {
 *		name
 *	}
 *  @return {*}
 *
 */
const GameCard: React.FC<GameCardProps> = async ({
	id,
	verified,
	...divParams
}) => {
	// get game data
	const gameResponse = await fetch(`${BaseURL}/api/game/${id}`);
	const game: GameResponseType = await gameResponse.json();

	// get game status
	const gameStatus = inferGameStatus(game.team1?.points, game.team2?.points);

	return (
		<div
			{...divParams}
			className="mt-4 grid h-48 min-w-full grid-cols-12 justify-start gap-4 rounded-xl border p-4 align-top shadow-lg"
		>
			<div className="col-span-3 flex flex-col items-center justify-center">
				{game.team1?.image ? (
					<img
						className="h-12 w-12 flex-none rounded-md bg-gray-50 sm:h-16 sm:w-16 lg:h-24 lg:min-h-0 lg:w-24 2xl:h-36 2xl:w-36"
						src={
							typeof game.team1.image === "string"
								? game.team1.image
								: undefined
						}
						alt=""
					/>
				) : (
					<div className="flex h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
				)}
				<div className="flex flex-col justify-center">
					<p className="p-2 text-center text-xs font-semibold lg:text-sm">
						{game.team1?.lastName}
					</p>
					<div className="flex items-center justify-center">
						<XSGrayMaetIcon />
						<p className="ml-1 text-xs text-gray-500">
							{Math.round(
								game.team1?.rating?.displayRating || 100
							)}
						</p>
					</div>
				</div>
			</div>
			<div className="col-span-6 flex flex-col items-start gap-8">
				<div className="flex min-w-full items-center justify-center">
					<div className="flex flex-col">
						<p className="font-semibold">{game.competitionName}</p>
						<div className="mt-1 flex items-center justify-center">
							<p className="text-xs text-gray-300">
								{getShortDateString(
									new Date(game.startTimeISO || "")
								)}{" "}
								at{" "}
								{getTimeString(
									new Date(game.startTimeISO || "")
								)}
							</p>
						</div>
						<div className="min-w-full flex-row lg:w-32">
							<div className="col-span-2 mt-1 grid grid-cols-2 items-center">
								{gameStatus !== "unreported" ? (
									<div className="col-span-1 mt-1 flex items-center justify-start">
										{gameStatus === "team1-winner" ? (
											<div className="col-span-1 flex items-center justify-start">
												<FaPlay className="mr-1" />
												<p className="font-bold lg:text-xl">
													{game.team1?.points}
												</p>
											</div>
										) : (
											<p className="lg:text-xl">
												{game.team1?.points}
											</p>
										)}
									</div>
								) : (
									<div></div>
								)}
								{gameStatus !== "unreported" ? (
									<div className="col-span-1 mt-1 flex items-center justify-end">
										{gameStatus === "team2-winner" ? (
											<div className="col-span-1 flex items-center">
												<FaPlay className="mr-1" />
												<p className="font-bold lg:text-xl">
													{game.team2?.points}
												</p>
											</div>
										) : (
											<div className="col-span-1 flex items-center">
												<p className="lg:text-xl">
													{game.team2?.points}
												</p>
											</div>
										)}
									</div>
								) : (
									<div></div>
								)}
							</div>
							<div className="mt-2 flex h-6 items-center justify-center lg:mt-6">
								{gameStatus ? (
									<div className="flex h-6 min-w-full items-center justify-center rounded-full bg-green-300 p-2 text-xs">
										<p>Verified</p>
									</div>
								) : (
									<div className="flex h-6 min-w-full items-center justify-center rounded-full bg-blue-200 p-2 text-xs">
										<p>Scheduled</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				{gameStatus ? (
					<div></div>
				) : (
					<div className="flex min-w-full flex-col">
						<div className="flex min-w-full flex-row items-start">
							<div className="ml-1 flex w-1/2 flex-col">
								<div className="flex h-3 min-w-full rounded-full bg-blue-200"></div>
								<p className="text-xs">50%</p>
							</div>
							<div className="-ml-1 mr-1 flex w-1/2 flex-col items-end">
								<div className="flex h-3 min-w-full rounded-full bg-primaryMain"></div>
								<p className="text-xs">50%</p>
							</div>
						</div>
						<div className="mb-1 mt-1 flex items-center justify-center text-sm font-bold">
							<p>Win Probability</p>
						</div>
					</div>
				)}
			</div>
			<div className="col-span-3 flex flex-col items-center justify-center">
				{game.team2?.image ? (
					<img
						className="h-12 w-12 flex-none rounded-md bg-gray-50 sm:h-16 sm:w-16 lg:h-24 lg:min-h-0 lg:w-24 2xl:h-36 2xl:w-36"
						src={
							typeof game.team2.image === "string"
								? game.team2.image
								: undefined
						}
						alt=""
					/>
				) : (
					<div className="flex h-24 w-24 rounded-md bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
				)}
				<div className="flex flex-col justify-center">
					<p className="p-2 text-center text-xs font-semibold lg:text-sm">
						{game.team2?.lastName}
					</p>
					<div className="flex items-center justify-center">
						<XSGrayMaetIcon />
						<p className="ml-1 text-xs text-gray-500">
							{Math.round(
								game.team2?.rating?.displayRating || 100
							)}
						</p>
					</div>
				</div>
			</div>
		</div>
		// <Grid
		// 	container
		// 	direction="row"
		// 	justifyContent="flex-start"
		// 	alignItems="flex-start"
		// 	sx={{
		// 		backgroundColor: "#f5f5f4",
		// 		border: 1,
		// 		borderRadius: 2,
		// 		borderColor: "#f5f5f4",
		// 		display: "inline-flex",
		// 		mt: 1,
		// 		height: 100,
		// 	}}
		// >
		// 	<Grid
		// 		container
		// 		item
		// 		xs={3}
		// 		alignItems="center"
		// 		justifyContent="center"
		// 	>
		// 		<ButtonBase
		// 			sx={{
		// 				width: 70,
		// 				height: 70,
		// 				border: 1,
		// 				borderRadius: 1,
		// 				borderColor: "#f5f5f4",
		// 				backgroundColor: "purple",
		// 				m: 1,
		// 			}}
		// 		></ButtonBase>
		// 	</Grid>
		// 	<Grid
		// 		item
		// 		xs={9}
		// 		sm
		// 		container
		// 		direction="column"
		// 		alignItems="flex-start"
		// 	>
		// 		<Typography sx={{ fontWeight: 700 }}>{name}</Typography>
		// 		<Grid
		// 			item
		// 			container
		// 			xs={6}
		// 			sx={{
		// 				display: "flex",
		// 			}}
		// 		></Grid>
		// 		<Grid
		// 			item
		// 			container
		// 			direction="row"
		// 			alignItems="flex-end"
		// 			display="flex"
		// 			xs={6}
		// 		></Grid>
		// 	</Grid>
		// </Grid>
	);
};

export default GameCard;