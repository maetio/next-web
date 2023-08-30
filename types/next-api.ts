import { CollectionDataTypes, SubcollectionDataTypes } from ".";

export type CompetitionsResponseType = ({ id: string } & Partial<
	CollectionDataTypes["competitions"]
>)[];

export type PlayersResponseType = ({ id: string } & Partial<
	SubcollectionDataTypes["competition-profiles"]
>)[];

export type PlayerResponseType = { id: string } & Partial<
	CollectionDataTypes["profiles"]
>;

export type GameResponseType = { id: string } & Partial<
	CollectionDataTypes["games"]
>;

export type GamesResponseType = ({ id: string } & Partial<
	CollectionDataTypes["games"]
>)[];

export type TeamsResponseType = ({ id: string } & Partial<
	SubcollectionDataTypes["competition-teams"]
>)[];

export type CompProfilesResponseType = { id: string } & Partial<
	SubcollectionDataTypes["competition-profiles"]
>;

export type GameProfilesResponseType = ({ id: string } & Partial<
	SubcollectionDataTypes["game-profiles"]
>)[];

export type ProfilesResponseType = ({ id: string } & Partial<
	CollectionDataTypes["profiles"]
>)[];
