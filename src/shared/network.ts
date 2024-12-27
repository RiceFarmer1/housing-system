import { Networking } from "@flamework/networking";

interface ClientToServerEvents {}

interface ServerToClientEvents {}

interface ClientToServerFunctions {
   Plot: {
    getPlot(player: Player): void
   }
}

interface ServerToClientFunctions {
    Plot: {
        getPlot(player: Player): void
       }
}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
