import { default as LoopRounded } from "@mui/icons-material/LoopRounded";
import { ToggleButton } from "@mui/material";
import { useMXContext } from "./MXProvider";

export default function ShouldLoop() {
    const {loop, setLoop} = useMXContext()

    return <ToggleButton 
        value="loop"
        selected={loop}
        title="Toggle loop of BGM"
        onChange={() => setLoop(!loop)}
    >
        <LoopRounded />
    </ToggleButton>
}