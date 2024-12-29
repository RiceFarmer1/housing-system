import { Service, OnStart, OnInit } from "@flamework/core";
import { Players } from "@rbxts/services";
import { promiseTree } from "@rbxts/validate-tree";

const player = Players.LocalPlayer;

const characterSchema = {
	$className: "Model",
	HumanoidRootPart: "BasePart",
	Humanoid: {
		$className: "Humanoid",
		Animator: "Animator",
	},
} as const;

export interface Character extends Model {
	HumanoidRootPart: BasePart;
	Humanoid: Humanoid & {
		Animator: Animator;
	};
}

export function onPlayerAdded(callback: (player: Player) => void) {
	const connection = Players.PlayerAdded.Connect(callback);

	for (const player of Players.GetPlayers()) {
		callback(player);
	}

	return () => {
		connection.Disconnect();
	};
}

@Service({})
export class PlayerService implements OnStart, OnInit {
	onStart() {
		function plotValidator(): boolean {
			//if statements to check if player is validated to own a plot

			if (!player?.IsA("Player")) {
				return false;
			} else addAttribute(player);

			return true;
		}

		function addAttribute(plr: Player) {
			plr.SetAttribute("Owner", 1);
		}
	}

	onInit(): void | Promise<void> {}
}
