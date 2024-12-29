import Vide, { Case, create, Derivable, Show, show, source, Switch } from "@rbxts/vide";

interface ArrowProps {
	text: Derivable<string>;
}

export default function Arrow({ text }: ArrowProps) {
	const arrow = source(text);

	return (
		<Switch condition={arrow}>
			<Case match=">">
				{() => (
					<textbutton
						Name="right-arrow"
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text=">"
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						BackgroundColor3={Color3.fromRGB(236, 158, 255)}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.616, 0.846)}
						Size={UDim2.fromOffset(84, 76)}
					></textbutton>
				)}
			</Case>

			<Case match="<">
				{() => (
					<textbutton
						Name="left-arrow"
						FontFace={new Font("rbxasset://fonts/families/FredokaOne.json")}
						Text="<"
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						BackgroundColor3={Color3.fromRGB(236, 158, 255)}
						BorderColor3={Color3.fromRGB(0, 0, 0)}
						BorderSizePixel={0}
						Position={UDim2.fromScale(0.472, 0.846)}
						Size={UDim2.fromOffset(84, 76)}
					></textbutton>
				)}
			</Case>
		</Switch>
	);
}
