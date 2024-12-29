import { ReplicatedStorage } from "@rbxts/services";

export const Remotes = {
	ClientToServer: new Instance("RemoteEvent", ReplicatedStorage),
	ServerToClient: new Instance("RemoteEvent", ReplicatedStorage),
};
