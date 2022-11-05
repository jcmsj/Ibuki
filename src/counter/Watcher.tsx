import { useCallback, useEffect } from "react";
import { useCounter } from "./CounterProvider";
import { STATE, usePlayerContext } from "./PlayerProvider";

/**
 * @desc Listens to keyboard events for global timer control
 * @implNote Just an empty component
 */
export default function Watcher() {
    const { state, stop, toggle } = usePlayerContext()
    const { count, restore } = useCounter();
    const tick = useCallback((e: KeyboardEvent) => {
        console.log(e.code, state.toString());
        switch (e.code) {
            case "Space":
                //Suspend listening to space
                if (state != STATE.EDITING)
                    toggle()
                break;
        }
    }, [state, count])

    //onmount
    useEffect(() => {
        window.addEventListener("keydown", tick);

        return () => {
            window.removeEventListener("keydown", tick);
        }
    }, [tick])
    return <>
    </>
}