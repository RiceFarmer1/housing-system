export interface ShopItem {
	id: string;
	name: string;
	price: number;
	imageId: string;
}

export const ShopItems: ShopItem[] = [
	{ id: "Couch", name: "Brown", price: 100, imageId: "rbxassetid://9999" },
	{ id: "Furniture", name: "Brown", price: 150, imageId: "rbxassetid://9999" },
	{ id: "Item", name: "Bruh", price: 50, imageId: "rbxassetid://99999" },
];
