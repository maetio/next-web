import { BaseURL } from "config/constants";
import { GameResponseType } from "types/next-api";

export default async function ViewGameScreen({
	params,
}: {
	params: { id: string };
}) {

	const id = params;
    
	const gameResponse = await fetch(`${BaseURL}/api/game/${id}`);
	const game: GameResponseType = await gameResponse.json();
 
	return (
		<main className="mx-10">
            
		</main>
	);
}