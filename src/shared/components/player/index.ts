import { AnyEntity, component } from "@rbxts/matter";
import { Document } from "@rbxts/lapis";
import { playerData } from "types/interface/default-data";

export const User = component<{
	player: Player;
}>("Player");
export type User = ReturnType<typeof User>;

export const Data = component<{
	key?: string;
	document?: Document<playerData>;
	collection?: Readonly<playerData>;
}>("Data");
export type Data = ReturnType<typeof Data>;

export const Cash = component<{
	id: AnyEntity;
	cash: number;
	player: Player;
	gui: PlayerGui;
}>("Cash");
