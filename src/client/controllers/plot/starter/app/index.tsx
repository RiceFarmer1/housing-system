import Vide from "@rbxts/vide";
import Arrow from "./arrow";

export default function StarterApp() {
    return <screengui>
        <frame Size={UDim2.fromScale(1, 1)} BackgroundTransparency={1}>
        <Arrow text=">"></Arrow>
        <Arrow text="<"></Arrow>
    </frame>
    </screengui> 
}