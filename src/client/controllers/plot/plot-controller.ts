import { Controller, OnStart, OnInit } from "@flamework/core";
import { HttpService } from "@rbxts/services";
import { Janitor } from "@rbxts/better-janitor";
import { Players } from "@rbxts/services";

const uniqueId = HttpService.GenerateGUID(false);

const KEY_CODES = new ReadonlySet<Enum.UserInputType | Enum.KeyCode>([Enum.UserInputType.MouseButton1]);

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

			if (tycoons.isEmpty()) {
				return;
			}

			function getRandomPlot() {}
		}
	}

	onStart() {}
}
