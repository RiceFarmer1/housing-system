import { Service, OnStart, OnInit } from "@flamework/core";
import { Janitor } from "@rbxts/better-janitor";
import { Logger } from "@rbxts/log";
import { CollectionService, Players, RunService, Workspace } from "@rbxts/services";

export class ShopController implements OnStart {
	constructor(readonly logger: Logger) {}
	onStart() {
		this.loadShop().catch((err) => this.logger.Error(err));
	}

	public async getShop(): Promise<Instance> {
		// this is just a general array of shops, there could be more like gears shop
		const tagged = CollectionService.GetTagged("Shop");
		return [...new Set(tagged)].filter((v) => v.Name === "Shop").shift() as Instance;
	}

	private async loadShop() {
		const janitor = new Janitor<string>();
		const shop = await this.getShop();
		if (shop === undefined) {
			this.logger.Info("Failed to get any shops");
		}

		janitor.addFunction(() => {
			shop.Destroy();
			shop.Destroying.Connect(() => this.logger.Info(`Destroying shop: ${shop.Name}`));
		}, "Deleting shop");

		task.spawn(() => {
			const event: RBXScriptConnection = RunService.RenderStepped.Connect((delta) => {
				const character = Players.LocalPlayer.CharacterAdded.Wait()[0];
				if (character === undefined) {
					throw "Character was not loaded yet";
				}

				const touchPlrs = Workspace.GetPartsInPart(shop as BasePart, new OverlapParams());
				if (touchPlrs.isEmpty()) return;
				const players = touchPlrs.filter((v) => v.IsDescendantOf(character));

				const player = players[0];
				//opens shop
			});

			janitor.addFunction(() => {
				event.Disconnect();
				this.logger.Info("Cleaning up events");
			}, "Destroying render.stepped");
		});
	}

	public toggleShopUI(playerGui: PlayerGui) {
		const shop = playerGui.WaitForChild("Shop") as ScreenGui;
		if (shop === undefined) return;
		shop.Enabled = !shop.Enabled;
	}
}
