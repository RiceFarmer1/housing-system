import { KickReason } from "types/enum/remove";
import { AnyEntity, World } from "@rbxts/matter";
import { Rig } from "shared/components/entity";
import { User } from "shared/components/player";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";

export function softKickPlayers(players: Player, reason: KickReason): void;
export function softKickPlayers(players: Player[] | Player, reason: KickReason) {
	if (t.table(players)) {
		(players as Player[]).forEach((player) =>
			player.Kick(`You have been kicked for : ${KickReason.PlayerProfileUndefined}`),
		);
	} else if (t.Instance(players)) {
		(players as Player).Kick(`You have been kicked for: ${KickReason.PlayerProfileUndefined}`);
	}
}

export async function waitForNumberOfPlayers(num: number, timeout = 10) {
	return new Promise<void>((resolve, reject, onCancel) => {
		Promise.delay(timeout).then(() => {
			if (Players.GetPlayers().size() < num) {
				reject("Timed out");
			}
			resolve();
		});
	});
}

export function selectLocalPlayer<T extends AnyEntity>(world: World, playerArg: Player): T | unknown {
	let localPlayer: T | unknown;
	for (const [id, player, rig] of world.query(User, Rig)) {
		if (player.player === undefined) continue;
		if (player.player !== playerArg) continue;

		if (!Players.GetPlayerFromCharacter(rig.Body)) continue;

		localPlayer = id;
	}

	return localPlayer;
}

export function onPlayerJoin(func: (player: Player) => void) {
	const event = Players.PlayerAdded.Connect(func);

	return () => {
		event.Disconnect();
	};
}
