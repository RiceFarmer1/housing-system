import { Players, Workspace, ReplicatedStorage } from "@rbxts/services";

interface Plot {
	part: BasePart;
	owner?: Player;
}

class PlotPlacementSystem {
	private plots: Plot[] = [];

	constructor() {
		this.initializePlots();
		this.setupPlayerEvents();
	}

	private initializePlots(): void {
		const plotFolder = Workspace.WaitForChild("Plots") as Folder;

		for (const plotPart of plotFolder.GetChildren()) {
			if (plotPart.IsA("BasePart")) {
				this.plots.push({ part: plotPart });
			}
		}
	}

	private setupPlayerEvents(): void {
		Players.PlayerAdded.Connect((player) => {
			player.CharacterAdded.Connect(() => {
				const playerPlot = this.getPlotByOwner(player);
				if (playerPlot) {
					this.teleportToPlot(player, playerPlot);
				}
			});
		});

		const plotClaimEvent = ReplicatedStorage.WaitForChild("PlotClaimEvent") as RemoteEvent;
		plotClaimEvent.OnServerEvent.Connect((player, plotPart) => {
			warn(`Handling plot for: ${player.GetFullName}`);
		});
	}

	private claimPlot(player: Player, plotPart: BasePart): void {
		const plot = this.plots.find((p) => p.part === plotPart);
		if (plot) {
			if (!plot.owner) {
				plot.owner = player;
				player.LoadCharacter();
				warn(`${player.Name} claimed the plot!`);
			} else {
				player.Kick("This plot is already claimed!");
			}
		}
	}

	private getPlotByOwner(player: Player): Plot | undefined {
		return this.plots.find((p) => p.owner === player);
	}

	private teleportToPlot(player: Player, plot: Plot): void {
		if (plot.part && player.Character) {
			const rootPart = player.Character.FindFirstChild("HumanoidRootPart") as BasePart;
			if (rootPart) {
				rootPart.CFrame = plot.part.CFrame.add(new Vector3(0, 5, 0));
			}
		}
	}
}

export = new PlotPlacementSystem();
