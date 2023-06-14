import React from "react";
import { Grid } from "@mui/material";
import { CompetitionCard, CompetitionCardProps } from "./competition-card";
import TeamCard, { TeamCardProps } from "./team-card";
import PlayerCard, { PlayerCardProps } from "./player-card";

type ViewCompetitionProps = {
    competitions: CompetitionCardProps,
    players: PlayerCardProps,
    teams: TeamCardProps
}

const ViewCompetition = (props: ViewCompetitionProps) => {
	return (
		<Grid>
			<CompetitionCard name={""} date={""} sport={{
				sportName: "",
				icon: undefined
			}}/>
			<TeamCard name={""} location={""} position={0} score={0} change={{
				color: "",
				magnitude: 0
			}}/>
			<PlayerCard name={""} position={0} score={0} change={{
				color: "",
				magnitude: 0
			}}/>
		</Grid>
	);
};

export default ViewCompetition;
