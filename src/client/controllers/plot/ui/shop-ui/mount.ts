import { Remotes } from "./remotes/remote";
import { Players } from "@rbxts/services";
import Roact from "@rbxts/roact";

interface ShopItem {
	id: string;
	name: string;
	price: number;
	imageId: string;
}

interface ShopUIProps {
	items: ShopItem[];
}
