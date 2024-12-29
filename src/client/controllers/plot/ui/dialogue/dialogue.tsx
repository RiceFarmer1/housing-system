import { Remotes } from "../shop-ui/remotes/remote";
import { Players, ReplicatedStorage } from "@rbxts/services";
import Roact from "@rbxts/roact";

interface DialogueProps {
	text: string;
	options: { text: string; onClick: () => void }[];
}
