import { CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "test-map-fuser",
	Description: "Test the map fuser",
	Aliases: ["tmf"],
	Args: [],
	ClientRun: (players, args) => {
		return "Test map fuser";
	},
});
