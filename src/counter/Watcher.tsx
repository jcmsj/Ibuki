import { useEvent } from "react-use";
import { useCounter } from "./CounterProvider";
import { name as timerEV, send, TimerEV, TimerEvent } from "./TimerEV";
import { STATE, usePlayerContext } from "./PlayerProvider";

/**
 * @desc Listens to keyboard events for global timer control
 * @implNote Just an empty component
 */
export default function Watcher() {
    const { state, stop, toggle, start } = usePlayerContext()
    const { restore } = useCounter();
    function tick(e: KeyboardEvent) {
        console.log(e.code, state.toString());
        switch (e.code) {
            case "Space":
                //Suspend listening to space
                if (state != STATE.EDITING) {
                    send()
                }
                break;

            case "Escape":
                send(TimerEV.STOP)
                break;
        }
    }
    useEvent("keyup", tick)

    function watcher(e: TimerEvent) {
        switch (e.detail.type) {
            case TimerEV.TOGGLE:
                toggle()
            break;
            case TimerEV.PAUSE:
                start()
            break;
            case TimerEV.PLAY:
                stop()
            break;
            case TimerEV.STOP:
                restore();
                stop();
            break;
        }
    }
    useEvent(timerEV, watcher)
    return <>
    </>;
}