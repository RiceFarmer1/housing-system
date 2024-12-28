import { Service, OnStart, OnInit } from "@flamework/core";
import { HttpService, ReplicatedStorage } from "@rbxts/services";
import Tree from "server/services/store/Tree";
import { Players } from "@rbxts/services";

const plot = Tree.Find(ReplicatedStorage, "Plot");
const plotVectorA = new Vector3();
const plotVectorB = new Vector3();
//dot product is useful for finding the angle between the player's placement idk
const dotProduct = plotVectorB.Dot(plotVectorA); //the angle between the plot's magnitude vectors

const magnitudeA = plotVectorA.Magnitude;
const magnitudeB = plotVectorB.Magnitude;

const plr = new Map<Players, number>();
const q = new Map<number, number>();
const v = new Vector3();

const angle = math.acos(dotProduct / (magnitudeA * magnitudeB));
const deg = math.deg(angle);
const rad = math.rad(angle);

type Position = {
	position?: Vector3;
	center?: Vector3;
	size: Vector3;

	MIN_X?: Vector3;
	MAX_X: Vector3;

	MIN_Y: Vector3;
	MAX_Y: Vector3;
};

type pos = {
	center: Vector3;
	size: Vector3;
};

@Service({})
export class PlotSystem implements OnInit {
	private plot: pos;

	constructor(plotCenter: Vector3, plotSize: Vector3) {
		this.plot = { center: plotCenter, size: plotSize };
	}

	private isVertexWithinBoundary(vertex: Vector3): boolean {
		const minX = this.plot.center.X - this.plot.size.X / 2;
		const maxX = this.plot.center.X + this.plot.size.X / 2;
		const minZ = this.plot.center.Z - this.plot.size.Z / 2;
		const maxZ = this.plot.center.Z + this.plot.size.Z / 2;

		return vertex.X >= minX && vertex.X <= maxX && vertex.Z >= minZ && vertex.Z <= maxZ;
	}
	//calculate precision of vertices and validate it O(logN) regiuhergiuherkgoaowdij
	private calculuatePrecision(center: Vector3, size: Vector3, orientation: CFrame): Vector3[] {
		const midPoint = size.div(2).mul(1);

		const offsets = [
			new Vector3(midPoint.X, 0, midPoint.Z),
			new Vector3(-midPoint.X, 0, midPoint.Z),
			new Vector3(midPoint.X, 0, -midPoint.Z),
			new Vector3(-midPoint.X, 0, -midPoint.Z),
		];
		return offsets.map((offset) => orientation.PointToWorldSpace(offset));
	}

	onInit(): void | Promise<void> {
		function placementGrid(position: Vector3, gridSize: number): Vector3 {
			return new Vector3(
				math.floor(position.X / gridSize) * gridSize,
				math.floor(position.Y / gridSize) * gridSize,
				math.floor(position.Z / gridSize) * gridSize,
			);
		}

		const placementSystem = (position: Vector3, zone: Position): Vector3 => {
			const clampedX = math.clamp(
				position.X,
				zone.MIN_X?.X ?? zone.size.X / 2 - (zone.center?.X ?? 0),
				zone.MAX_X?.X ?? zone.size.X / 2 + (zone.center?.X ?? 0),
			);

			const clampedY = math.clamp(
				position.Y,
				zone.MIN_Y?.Y ?? zone.size.Y / 2 - (zone.center?.Y ?? 0),
				zone.MAX_Y?.Y ?? zone.size.Y / 2 + (zone.center?.Y ?? 0),
			);

			return new Vector3(clampedX, clampedY, position.Z);
		};
	}
}
