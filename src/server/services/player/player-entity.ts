export default class PlayerEntity {
	private player: Player | undefined;

	constructor(player: Player) {
		this.player = player;
	}

	public getEntity(): Player {
		return this.player as Player;
	}
}
