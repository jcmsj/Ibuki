import { FormEvent, useEffect, useState } from "react";
import { useCounter } from "./CounterProvider";
import { usePlayerContext, STATE } from "./PlayerProvider";
import { useInterval } from "../lib/useInterval";
import { name as timerEV, send, TimerEV, TimerEvent } from "./TimerEV";
import { useRoutineContext } from "../routine/RoutineProvider";
import { useEvent } from "react-use";

/**
 * @implNote in ms
 * @TODO custom interval?
 */
const interval = 1000;
export function InputTimer() {
  const { count, last, setCount, dec, save, restore } = useCounter();
  const { state, stop, edit } = usePlayerContext()
  const [raw, setRaw] = useState("")
  useInterval(dec, state == STATE.PLAYING ? interval : undefined)
  const {dispatch} = useRoutineContext()
  function override(e: FormEvent<HTMLInputElement>) {
    setRaw(e.currentTarget.value)
    //Note: Only update `count` when input is committed
  }

  useEffect(() => {
    //Keeps raw synced with last
    setRaw("" + last)
  }, [last])

  function commitOrRollback() {
    const stripped = parseInt(raw.replace(/\D/, ""));
    if (isNaN(stripped)) {
    } else {
      // Override
      setCount(stripped)
      save()
    }

    stop()
  }

  function goEdit() {
    send(TimerEV.STOP)
    edit()
  }
  useEvent(timerEV, (e:TimerEvent) => {
    switch(e.detail.type) {
      case TimerEV.NEXT:
        send(TimerEV.STOP)
        restore()
        dispatch({next:{item:true}})
        send()
      break;
    }
  })
  useEffect(() => {
    if (state == STATE.PLAYING && count < 0) {
      send(TimerEV.NEXT)
    }
  }, [count])

  function onKeyDown(e:React.KeyboardEvent<HTMLInputElement>) {
      switch (e.code) {
        case "Space":
          e.stopPropagation()
          break;
        case "Enter":
          e.currentTarget.blur()
          break;
        case "Escape":
          e.stopPropagation()
          e.currentTarget.blur()
          restore()
          break;
      }
  }
  return <>
    <h1 style={{ textAlign: "center" }}>
      <input type="number"
        style={{
          border: "none",
          textAlign: "center",
          fontSize: "inherit",
          width: "max-content"
        }}
        onFocus={goEdit}
        onBlur={commitOrRollback}
        onKeyDown={onKeyDown}
        onChange={override}
        value={state == STATE.EDITING ? raw : count}
      />
    </h1>
  </>
}
