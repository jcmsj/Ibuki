import { option } from "@jcsj/option";
import { useEvent } from "react-use";
import { useMXContext } from "./MXProvider";

export default function Controller() {
    const audio = useMXContext()
    function toggle() {
        option(audio.current).bind(a => {
            a.paused ? a.play() : a.pause()
        })
    }
    
    function watcher(e: KeyboardEvent) {
        console.log(e.code);
        switch (e.code) {
            case "Space":
                toggle()
                break;
        }
    }

    useEvent("keyup", watcher)

    return <></>
}