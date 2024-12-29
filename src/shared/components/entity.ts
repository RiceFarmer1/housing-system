import { Component, component } from "@rbxts/matter";
import Simpepath from "@rbxts/simplepath";

export enum ExecutionState {
	Running,
	Success,
	Failure,
}

export enum BehaviorState {
	Init,
	Roaming,
}

export const Rig = component<{
	Body: Model;
}>("Rig");
export type Rig = ReturnType<typeof Rig>;
