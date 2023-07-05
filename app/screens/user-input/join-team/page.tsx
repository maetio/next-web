
import { InputField } from "app/components/user-input/input-field/page";
import {
	Box,
	Button,
	Cancel,
	Grid,
	Typography,
} from "app/components/providers/mui-server-components";
import { PlayerCard } from "app/components/cards/player-card/page";
import { SubmitButton } from "app/components/user-input/submit-button/page";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getTeam } from "actions/server/teams";

export interface JoinTeamProps {
	image?: string;
	teamName: string;
}

const JoinTeamSchema = Yup.object().shape({
	passcode: Yup.string().required("Passcode is required"),
});

export /**
 * Screen where the user can join a team that they have selected
 *
 * @param {string} image
 * @param {string} teamName
 * @returns
 */
const JoinTeam: React.FC<JoinTeamProps> = async (image) => {
	const { handleSubmit } = useForm({
		resolver: yupResolver(JoinTeamSchema),
	});

	const id = "63AuFoQ7jcYal0ttQcT0";
	const teamData = await getTeam(id);
	return (
		<form onSubmit={handleSubmit((data) => console.log(data))}>
			<Grid
				sx={{ height: "100vh", backgroundColor: "#D9D9D9" }}
				container
				alignItems="center"
				justifyContent="center"
			>
				<Grid
					sx={{
						width: 1100,
						height: 850,
						border: 1,
						borderColor: "#FAFAFA",
						borderRadius: 30,
						backgroundColor: "#FAFAFA",
					}}
					container
				>
					<Grid
						container
						direction="row"
						justifyContent="flex-end"
						alignItems="flex-end"
						sx={{
							width: 1000,
						}}
					>
						<Button sx={{ color: "#333333", mr: 8 }}>
							<Cancel></Cancel>
						</Button>
					</Grid>
					<Grid container direction="column" alignItems="center" item>
						<Box
							sx={{
								mb: 1,
								backgroundImage:
									"linear-gradient(180deg, #908EEA 0%, #BEFBE5 100%)" ||
									image,
								width: 250,
								height: 250,
								borderRadius: 4,
							}}
						></Box>
						<Typography variant="h2" sx={{ fontWeight: 700 }}>
							{teamData.data()?.firstName}
						</Typography>
						<Typography variant="h6">
							Contact the team captain for the team passcode
						</Typography>
						<InputField
							id="passcode"
							label="Enter Team Passcode"
						></InputField>
						<Typography>Team Roster</Typography>
						<Grid
							container
							direction="column"
							sx={{ mt: 1, mb: 3, width: 480 }}
						>
							<PlayerCard name="Player Name" score={99} />
							<PlayerCard name="Player Name" score={99} />
							<PlayerCard name="Player Name" score={99} />
						</Grid>
						<SubmitButton title="Join Team" color="#818CF8" />
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};

export default JoinTeam;
