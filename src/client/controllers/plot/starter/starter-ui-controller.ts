import { Controller, OnInit, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { mount } from "@rbxts/vide";
import StarterApp from "./app";

const localPlayer = Players.LocalPlayer;

@Controller({})
export class StarterUIController implements OnInit, OnStart {
	private readonly target = localPlayer.WaitForChild("PlayerGui");

	public onInit(): void | Promise<void> {
		mount(StarterApp, this.target);
	}

	public onStart(): void {}
}
