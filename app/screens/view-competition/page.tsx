import Link from "next/link";
import React from "react";

type Props = {}

const ViewCompetition = (props: Props) => {
	return (
		<div>
			<h1>View Competition</h1>
			<div>
				<Link href="/screens/create-game">Create Game </Link>
				<Link href="/screens/edit-competition">Edit Competition </Link>
				<Link href="/screens/input-scores">Input Scores </Link>
				<Link href="/screens/team-rankings">Team Rankings </Link>
				<Link href="/screens/player-rankings">Player Rankings </Link>
				<Link href="/screens/games-list">Games List </Link>
			</div>
		</div>
	);
};

export default ViewCompetition;