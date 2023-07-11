import React from "react";
import { FaMedal, FaArrowTrendUp } from "react-icons/fa6";
import { MaetIcon, SmallMaetIcon } from "../../icons/maet-icon";

export interface PlayerCardProps {
	name?: string;
	image?: string;
	score?: number;
}

export /**
 * Card that renders the initial player data
 *
 * @param {*} {
 *		PlayerCardProps
 *	}
 *  @return {*}
 *
 */
const PlayerCard: React.FC<PlayerCardProps> = ({ name, image, score }) => {
	return (
		<div className="grid gap-4 grid-cols-12 justify-start items-center border-b h-12 w-2/5">
			<div className="col-span-7 flex items-center gap-2">
				<FaMedal className="text-yellow-300 ml-2"/>
				<div className=" w-6 h-6 rounded-full bg-gradient-to-b from-gradientYellow via-gradientOrange to-gradientBlue"></div>
				<text className="font-bold text-sm">{name}</text>
			</div>
			<div className="col-span-5 flex items-center gap-2">
				<SmallMaetIcon/>
				<text className="font-bold text-sm">{score}</text>
				<div className="flex gap-1">
					<div>
						<FaArrowTrendUp className="text-green-800 text-md" />
					</div>
					<text className="font-bold text-sm text-green-800">+99</text>
				</div>
			</div>
		</div>
		// <Grid
		// 	container
		// 	direction="row"
		// 	justifyContent="flex-start"
		// 	alignItems="center"
		// 	sx={{
		// 		borderBottom: 1,
		// 		borderColor: "#E5E5E5",
		// 		display: "inline-flex",
		// 		mt: 1,
		// 		height: 60,
		// 		width: 480,
		// 	}}
		// >
		// 	<Grid item container xs={6} alignItems="center">
		// 		<Box
		// 			sx={{
		// 				ml: 2,
		// 				backgroundImage:
		// 					image ||
		// 					"linear-gradient(207deg, #EAE68E 13.76%, #FBBEBE 60.61%, #BEE1FB 100%);",
		// 				borderRadius: "50%",
		// 				width: 40,
		// 				height: 41,
		// 			}}
		// 		></Box>
		// 		<Typography sx={{ fontWeight: 700, ml: 2 }}>{name}</Typography>
		// 	</Grid>
		// 	<Grid
		// 		item
		// 		container
		// 		xs={6}
		// 		direction="row"
		// 		alignItems="flex-end"
		// 		justifyContent="flex-end"
		// 	>
		// 		<MaetIcon sx={{ mr: 1 }}></MaetIcon>
		// 		<Typography sx={{ fontWeight: 300, mr: 4 }}>{score}</Typography>
		// 	</Grid>
		// </Grid>
	);
};

export default PlayerCard;