import { useEvent } from "react-use";
import { useCounter } from "./CounterProvider";
import { send, TimerEV } from "./TimerEV";
import { STATE, usePlayerContext } from "./PlayerProvider";

const ev = new CustomEvent("timer", {detail:{
    type:TimerEV.toggle
}})

/**
 * @desc Listens to keyboard events for global timer control
 * @implNote Just an empty component
 */
export default function Watcher() {
    const { state, stop, toggle } = usePlayerContext()
    const { restore } = useCounter();
    function tick(e: KeyboardEvent) {
        console.log(e.code, state.toString());
        switch (e.code) {
            case "Space":
                //Suspend listening to space
                if (state != STATE.EDITING) {
                    toggle();
                    send()
                }
                break;

            case "Escape":
                restore();
                stop();
                send(TimerEV.stop)
                break;
        }
    }
    useEvent("keyup", tick)
    return <>
    </>;
}