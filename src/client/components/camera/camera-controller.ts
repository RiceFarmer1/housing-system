import { Service, OnStart } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";

let target: Model | undefined;

@Service({})
export class CameraController implements OnStart {
	private readonly camera = Workspace.CurrentCamera;
	private readonly player = Players.LocalPlayer;

	protected setFocus(cf: CFrame) {}

	onStart() {}
}
