import { Remotes } from "./remotes/remote";
import { Players } from "@rbxts/services";
import Roact from "@rbxts/roact";
import { Value } from "@rbxts/fusion";

interface ShopItem {
	id: string;
	name: string;
	price: number;
	imageId: string;
}

interface ShopUIProps {
	items: ShopItem[];
}
