import { Controller, OnStart, OnInit } from "@flamework/core";
import { HttpService, ReplicatedFirst, ReplicatedStorage } from "@rbxts/services";
import { Janitor } from "@rbxts/better-janitor";
import { Players } from "@rbxts/services";

const uniqueId = HttpService.GenerateGUID(false);
const KEY_CODES = new ReadonlySet<Enum.UserInputType | Enum.KeyCode>([Enum.UserInputType.MouseButton1]);

const player = Players.LocalPlayer;
const guiText = Players.WaitForChild("PlayerGui")
	.WaitForChild("PlotGui")
	.WaitForChild("Claim")
	.WaitForChild("TextLabel") as TextLabel;

const plotGui = ReplicatedStorage.WaitForChild("PlayerGui").WaitForChild("PlotGui") as ScreenGui;

@Controller({})
export class PlotController implements OnStart, OnInit {
	private janitor = new Janitor<string>();

	public destroy() {
		this.janitor.destroy();
	}

	public cleanup() {
		this.janitor.cleanup();
	}

	onInit(): void | Promise<void> {
		function plotListener(player: Player, callback: (plot: string) => void): () => void {
			if (player.Character) {
				callback(uniqueId);
			}

			return () => {};
		}

		function getUnOccupiedPlot() {
			const tycoons = new Map<number, number>();
			plotGui.Enabled = true;
			guiText.Active = true;
			if (tycoons.isEmpty()) {
				return tycoons.set(1, 2);
			}

			function getRandomPlot() {
				const RNG = new Random();
				const index = RNG.NextInteger(0, tycoons.size());
			}
		}
	}

	onStart() {}
}
