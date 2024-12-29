import { Service, OnStart } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import Vide = require("@rbxts/vide");

let target: Model | undefined;

type Animatable = number | CFrame | Color3 | UDim | UDim2 | Vector2 | Vector3 | Rect;

type Setter<T> = {
	position?: T;
	velocity?: T;
	impulse?: T;
};

function spring<T>(source: () => T & Animatable, period: number = 1, damping_ratio: number = 1): [() => T, Setter<T>] {
	const getter = (): T => {
		return source();
	};

	const setter: Setter<T> = {
		position: undefined,
		velocity: undefined,
		impulse: undefined,
	};

	return [getter, setter];
}

@Service({})
export class CameraController implements OnStart {
	private readonly camera = Workspace.CurrentCamera;
	private readonly player = Players.LocalPlayer;

	protected setFocus(cf: CFrame) {}

	onStart() {}
}
