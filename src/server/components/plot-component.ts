import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import PlayerEntity from "server/services/player/player-entity";

interface Attributes {}

@Component({
	tag: "Plot",
})
export default class PlotComponent extends BaseComponent<Attributes> implements OnStart {
	/**
	 * Variable to holds the current owner of the plot
	 * @private
	 */
	private player: PlayerEntity | unknown;

	constructor() {
		super();
	}

	onStart() {}

	public setOwner(player: PlayerEntity | unknown) {
		this.player = player;
	}

	public getOwner(): PlayerEntity | unknown {
		return this.player;
	}
}
