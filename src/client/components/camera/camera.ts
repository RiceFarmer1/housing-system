import { Service, OnStart, OnInit } from "@flamework/core";
import { Computed, Observer, StateObject, Value } from "@rbxts/fusion";
import { Janitor } from "@rbxts/better-janitor";
import { Logger } from "@rbxts/log";
import { Players, Workspace } from "@rbxts/services";

const player = Players.LocalPlayer;
const character = player.Character || player.CharacterAdded.Wait()[0];

@Service({})
export class CameraController implements OnStart, OnInit {
	private readonly camera = Workspace.CurrentCamera as Camera;

	private readonly player = Players.LocalPlayer;

	private readonly depth: number = 50;
	private readonly timeout?: number = 2;
	private readonly speed: number = 0.6;

	private readonly MAX_ZOOM: number = 2;
	private readonly MIN_ZOOM: number = 2;

	onStart(): void | Promise<void> {
		const janitor = new Janitor<string>();

		this.camera.CameraType = Enum.CameraType.Scriptable;
		janitor.addInstance(this.camera);

		this.player.CameraMaxZoomDistance = this.MAX_ZOOM;
		this.player.CameraMinZoomDistance = this.MIN_ZOOM;
	}

	onInit() {}
}
