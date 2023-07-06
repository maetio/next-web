import { MaetIcon } from "app/components/icons";
import { Typography, Box, AppBar, Toolbar, Grid } from "app/components/providers/mui-server-components";
import { SearchBar } from "app/components/user-input";
import React from "react";

export interface PageHeaderProps {
	title?: string;
}

export /**
 * Reusable page header/toolbar
 *
 * @param {*} {
 *		title,
 *	}
 *  @return {*}
 *
 */ const PageHeader = () => (
	<Box sx={{ flexGrow: 1, border: 1, borderColor: "#E5E5E5" }}>
		<AppBar position="static" sx={{backgroundColor: "#FFFFFF"}}>
			<Toolbar>
				<Grid container direction="row" alignItems="center">
					<Grid container item xs={3} alignItems="center" justifyContent="center">
						<MaetIcon color="primary"/>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#818CF8", ml: 2}}>
            				Maet
						</Typography>
					</Grid>
					<Grid container item xs={6} justifyContent="center" alignItems="center">
						<SearchBar width={250} label="Search"/>
					</Grid>
					<Grid container item xs={3} justifyContent="flex-end" alignItems="center">
						<Box
							sx={{
								backgroundImage: "linear-gradient(207deg, #EAE68E 13.76%, #FBBEBE 60.61%, #BEE1FB 100%);",
								borderRadius: "50%",
								width: 40,
								height: 41,
							}}
						></Box>
					</Grid>
				</Grid>
			</Toolbar>
			
		</AppBar>
	</Box>
);

export default PageHeader;