import { useEvent } from "react-use";
import { STATE, usePlayerContext } from "../counter/PlayerProvider";
import { send, TimerEV, TimerEvent, name as timerEV } from "../counter/TimerEV";
import { useMXContext } from "./MXProvider";

export default function Controller() {
    const { audio, startAt, loop } = useMXContext()
    const { state } = usePlayerContext()
    function toggle() {
        send(
            (audio.current?.paused ?? state == STATE.HALTED) ?
                TimerEV.PLAY : TimerEV.PAUSE
        )
    }

    function watcher(e: TimerEvent) {
        console.log(e.detail);
        switch (e.detail.type) {
            case TimerEV.PAUSE:
                audio.current?.pause()
                break;
            case TimerEV.PLAY:
                audio.current?.play()
                break;
            case TimerEV.STOP:
                if (audio.current) {
                    audio.current.pause()
                    if (loop) {
                        audio.current.currentTime = startAt
                    }
                }
                break;
            case TimerEV.TOGGLE:
                toggle()
                break;
        }
    }

    useEvent(timerEV, watcher)

    return <></>
}