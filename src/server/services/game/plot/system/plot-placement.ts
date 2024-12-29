import { Service, OnStart, OnInit } from "@flamework/core";
import { Players, Workspace, ReplicatedStorage, HttpService } from "@rbxts/services";
import { Serializer } from "../serializer/serializer";
import { Conditioner } from "shared/utils/conditioner";
import { InputManager, StandardActionBuilder } from "@rbxts/mechanism";
import { Janitor } from "@rbxts/better-janitor";
import PlayerEntity from "server/services/player/player-entity";

const gridSize = 4;
const height = 4;
const size = 4;

const input = new InputManager();
const action = new StandardActionBuilder(Enum.KeyCode.A, Enum.KeyCode.MouseLeftButton)
	.setProcessed(false)
	.setCooldown(0.25 * tick())
	.setInputQueueing(false);

input.bind(action);

const remote = new Instance("RemoteEvent");
remote.Parent = ReplicatedStorage;
remote.OnServerEvent.Connect(() => {
	const placement = new Instance("Part");
	if (!placement) action.destroy();

	const minX = placement.Position.X - placement.Size.X / 2;
	const maxX = placement.Position.X + placement.Size.X / 2;
	const minZ = placement.Position.Z - placement.Size.Z / 2;
	const maxZ = placement.Position.Z + placement.Size.Z / 2;

	const position = new Vector3(
		math.floor(placement.Position.X / gridSize) % gridSize,
		height / 2,
		math.floor(placement.Position.Z / gridSize) % gridSize,
	);

	action.activated.Connect(() => {
		placement.Position = position;
		placement.Anchored = true;
		placement.Size = new Vector3(size, size, size);
	});
});

@Service({})
export class PlotSystem implements OnInit {
	private readonly validator: Conditioner.ConditionValidator = new Conditioner.ConditionValidator();
	private readonly janitor = new Janitor<string>();

	public playerValidator(user: PlayerEntity) {
		if (!user) {
			this.validator.checkForNullable("Failed to find player", user);
			this.janitor.cleanup();
		}
		action.deactivated.Connect(() => {
			warn(`Deactivated`);
		});
	}

	onInit(): void | Promise<void> {
		function logForError(msg: string) {
			warn(msg, 2);
		}

		if (remote.IsA("RemoteEvent")) {
			logForError("Firing to server");
			remote.FireAllClients(action.rawInputs);
		}
	}
}
