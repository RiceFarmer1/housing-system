import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { Remotes } from "./remotes/remote";
import { ShopItem } from "./item-definition";

interface ShopUIProps {
	item: ShopItem[];
}

class ShopUI {
	render() {
		return (
			<screengui ResetOnSpawn={false}>
				<frame
					Size={new UDim2(0.6, 0, 0.6, 0)}
					Position={new UDim2(0.2, 0, 0.2, 0)}
					BackgroundColor3={Color3.fromRGB(50, 50, 50)}
					BorderSizePixel={0}
				>
					<textlabel
						Text="Shop"
						Size={new UDim2(1, 0, 0.1, 0)}
						TextScaled={true}
						BackgroundTransparency={1}
						TextColor3={Color3.fromRGB(255, 255, 255)}
					/>
					<scrollingframe
						Size={new UDim2(1, 0, 0.9, 0)}
						Position={new UDim2(0, 0, 0.1, 0)}
						BackgroundTransparency={1}
					>
						<uilistlayout Padding={new UDim(0, 10)} />
					</scrollingframe>
				</frame>
			</screengui>
		);
	}
}

export default ShopUI;
