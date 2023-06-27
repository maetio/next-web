import React from "react";
import { Avatar, Chip } from "../../providers/mui-server-components";

export interface PlayerDropdownChipProps {
	label: string;
	image: string;
}
export /**
 * Chip that populates the search bar textfield when the user selects a player/team
 *
 * @param {PlayerDropdownChipProps} props
 * @returns
 */
const DropdownChip: React.FC<PlayerDropdownChipProps> = ({label, image}) => {
	return (
		<Chip
			sx={{ backgroundColor: "#EEF2FF" }}
			avatar={<Avatar src={image}>PN</Avatar>}
			label={label || "Player Name"}
		/>
	);
};

export default DropdownChip;