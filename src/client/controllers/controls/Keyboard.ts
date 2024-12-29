import { Janitor } from "@rbxts/better-janitor";
import { ContextActionService, HttpService } from "@rbxts/services";
import Signal from "@rbxts/signal";

type InferEnumKeys<T extends CastsToEnum<EnumItem>[]> = T extends (infer K)[]
	? K extends CastsToEnum<EnumItem>
		? T
		: never
	: never;

interface KeyboardState<K> {
	KeyDown: Signal<(keycode: K) => void>;

	KeyboardKeyCodes: K[];
}

export default class Keyboard<K extends CastsToEnum<EnumItem>[]> implements KeyboardState<InferEnumKeys<K>> {
	public KeyDown: Signal<(keycode: CastsToEnum<EnumItem>) => void, false>;
	public KeyUp: Signal<(keycode: CastsToEnum<EnumItem>) => void, false>;

	private janitor = new Janitor<string>();

	KeyboardKeyCodes: InferEnumKeys<K>[];

	constructor(keyCodes: InferEnumKeys<CastsToEnum<EnumItem>[]>) {
		this.KeyDown = new Signal();
		this.KeyUp = new Signal();
		this.KeyboardKeyCodes = [];

		this.addCompatibleKeyCode(keyCodes);
		task.defer(() => {
			this.onKeyDown();
			this.onKeyUp();
		});
	}

	private onKeyDown() {
		this.KeyboardKeyCodes.forEach((keyCode) => {
			const unique = HttpService.GenerateGUID(false);
			ContextActionService.BindAction(
				`${unique}_keyboard`,
				() => {
					return Enum.ContextActionResult.Pass;
				},
				false,
				Enum.KeyCode.W,
			);
		});
	}

	private onKeyUp() {
		this.KeyboardKeyCodes.forEach((keyCode) => {
			const unique = HttpService.GenerateGUID(false);
			ContextActionService.BindAction(
				`${unique}_keyboard`,
				() => {
					return Enum.ContextActionResult.Pass;
				},
				false,
				Enum.KeyCode.W,
			);
		});
	}

	public addCompatibleKeyCode<T extends CastsToEnum<EnumItem>[]>(keyCode: InferEnumKeys<T>) {
		const keyExists = this.KeyboardKeyCodes.some((v) => v === keyCode);
		if (keyExists) return;
		this.KeyboardKeyCodes.push(keyCode);
	}
}
