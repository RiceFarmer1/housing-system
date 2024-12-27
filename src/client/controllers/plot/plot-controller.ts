import { Controller, OnInit, OnStart } from "@flamework/core";
import { mount } from "@rbxts/vide";
import { Events } from "client/network";

@Controller({})
export class PlotController implements OnStart, OnInit {
	public onInit() {}

	public onStart(): void {}
}
