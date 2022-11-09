import { option } from "@jcsj/option";
import { useEvent } from "react-use";
import { TimerEV, TimerEvent } from "../counter/TimerEV";
import { useMXContext } from "./MXProvider";

export default function Controller() {
    const {audio, startAt} = useMXContext()
    function toggle() {
        option(audio.current).bind(a => {
            a.paused ? a.play() : a.pause()
        })
    }
    
    function watcher(e: TimerEvent) {
        console.log(e.detail);
        switch (e.detail.type) {
            case TimerEV.stop:
                if (audio.current) {
                    audio.current.pause()
                    audio.current.currentTime = startAt
                }
                break;
            case TimerEV.toggle:
                toggle()
            break;
        }
    }

    useEvent("timer", watcher)

    return <></>
}