import { Service, OnStart } from "@flamework/core";
import { HttpService, Players } from "@rbxts/services";

const serializer = HttpService.GenerateGUID(false);
const plr = Players.LocalPlayer;

@Service({})
export class Serializer implements OnStart {
	onStart() {
		function serialize(id: string) {
			return (id = serializer);
		}
	}
}
