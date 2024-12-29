import Fusion, { ChildrenValue, Computed, New, OnEvent } from "@rbxts/fusion";
import { t } from "@rbxts/t";

const BUTTON_SIZE = UDim2.fromScale(0.5, 0.5);

interface ButtonProps {
	Name: string;
	Size?: UDim2;

	OnSelected: () => void;
}
