export interface ShopItem {
	id: string;
	name: string;
	price: number;
	imageId: string;
}

export const ShopItems: ShopItem[] = [
	{ id: "sword", name: "Sword", price: 100, imageId: "rbxassetid://9999" },
	{ id: "shield", name: "Shield", price: 150, imageId: "rbxassetid://9999" },
	{ id: "potion", name: "Health Potion", price: 50, imageId: "rbxassetid://99999" },
];
