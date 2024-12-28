import { Players, UserInputService, RunService } from "@rbxts/services";

const SPRINT_SPEED = 24;
const WALK_SPEED = 16;
const SPRINT_KEY = Enum.KeyCode.LeftShift;

class SprintingSystem {
	private player = Players.LocalPlayer;
	private character?: Model;
	private humanoid?: Humanoid;

	constructor() {
		this.player.CharacterAdded.Connect((character) => {
			this.onCharacterAdded(character);
		});

		if (this.player.Character) {
			this.onCharacterAdded(this.player.Character);
		}

		// Connect to input events
		this.setupInputHandling();
	}

	private onCharacterAdded(character: Model): void {
		this.character = character;
		this.humanoid = character.FindFirstChildOfClass("Humanoid");
		if (this.humanoid) {
			this.humanoid.WalkSpeed = WALK_SPEED;
		}
	}

	private setupInputHandling(): void {
		UserInputService.InputBegan.Connect((input, gameProcessed) => {
			if (gameProcessed) return;
			if (input.KeyCode === SPRINT_KEY) {
				this.setSprint(true);
			}
		});

		UserInputService.InputEnded.Connect((input) => {
			if (input.KeyCode === SPRINT_KEY) {
				this.setSprint(false);
			}
		});
	}

	private setSprint(isSprinting: boolean): void {
		if (this.humanoid) {
			this.humanoid.WalkSpeed = isSprinting ? SPRINT_SPEED : WALK_SPEED;
		}
	}
}

export = new SprintingSystem();
