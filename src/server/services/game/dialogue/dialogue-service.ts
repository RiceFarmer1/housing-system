import { Service, OnStart } from "@flamework/core";
import { Remotes } from "./remotes";
import { ReplicatedStorage, Workspace } from "@rbxts/services";

const npc = Workspace.WaitForChild("NPC") as Model;
const prompt = npc.WaitForChild("ProximityPrompt") as ProximityPrompt;

prompt.Triggered.Connect((player) => {
	Remotes.ClientToServer.FireServer("RequestDialogue", "start");
});

@Service({})
export class DialogueService implements OnStart {
	onStart() {}
}
