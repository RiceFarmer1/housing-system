import { BaseComponent, Components } from "@flamework/components";
import { Service, OnStart, OnInit, Dependency } from "@flamework/core";
import PlotComponent from "server/components/plot-component";
import PlayerEntity from "../player/player-entity";
import { Conditioner } from "shared/utils/conditioner";

/**
 * `PlotService`
 * Service for handling plots for player entities
 */

@Service({})
export class PlotService implements OnStart, OnInit {
	/**
	 * Components: PlotComopnent[]
	 * @private
	 */
	private readonly components = Dependency<Components>();

	/**
	 * A private validator to manages given parameters in cases when they are null.
	 * @private
	 */
	private readonly validator: Conditioner.ConditionValidator = new Conditioner.ConditionValidator();

	onStart() {}
	onInit(): void | Promise<void> {}

	public clearPlot(user: PlayerEntity) {
		const plot = this.getPlotForUser(user);
		this.validator.checkForNullable("Failed to get plot's owner", plot.getOwner());

		plot.setOwner(undefined);
	}

	/**
	 * Returns plot for user if it exists
	 * Or else creates a brand new plot for the user.
	 * @param user
	 * @returns
	 */
	public getPlotForUser(user: PlayerEntity): PlotComponent {
		this.validator.checkForNullable("Failed to get user", user.getEntity());

		const plot = this.getActivePlots().find((v) => v.getOwner() === user);
		if (plot) {
			return plot;
		} else {
			const empty_plots = this.getInactivePlots();
			const index = new Random().NextInteger(1, empty_plots.size() - 1);
			const new_plot = this.validator.checkForNullable(
				"Plot was not found",
				empty_plots.remove(index),
			) as PlotComponent;

			new_plot.setOwner(user);
			print(new_plot, user)
			return empty_plots[index];
		}
	}

	/**
	 * Get plots that are unoccupied
	 * @returns Array<PlotComponent>
	 */
	public getInactivePlots() {
		return this.getAllPlots().filter((plot) => !this.getActivePlots().some((v) => v === plot));
	}

	/**
	 * Get plots that are occupied
	 * @returns Array<PlotComponent>
	 */
	public getActivePlots() {
		return this.getAllPlots().filter((plot) => plot.getOwner() !== undefined);
	}

	/**
	 * Returns all of the plot components
	 * @returns
	 */
	public getAllPlots(): PlotComponent[] {
		return this.components.getAllComponents<PlotComponent>();
	}
}
