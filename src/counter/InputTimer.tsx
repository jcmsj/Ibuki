import { FormEvent, useEffect, useState } from "react";
import { useCounter } from "./CounterProvider";
import { usePlayerContext, STATE } from "./PlayerProvider";
import { useInterval } from "../lib/useInterval";

/**
 * @implNote in ms
 * @TODO custom interval?
 */
const interval = 1000;

export function InputTimer() {
  const { count, setCount, dec, save, restore } = useCounter();
  const { state, stop, edit } = usePlayerContext()
  const [raw, setRaw] = useState("")
  useInterval(dec, state == STATE.PLAYING ? interval : undefined)

  function override(e: FormEvent<HTMLInputElement>) {
    setRaw(e.currentTarget.value)
    //Only update `count` when input is committed
  }

  function resync() {
    setRaw("" + count); //Restore
  }
  function commitOrRollback() {
    const stripped = parseInt(raw.replace(/\D|\./, ""));
    if (isNaN(stripped)) {
    } else {
      // Override
      setCount(stripped)
      save()
    }
    resync()

    stop()
  }

  function onEdit() {
    resync()
    edit()
  }

  useEffect(() => {
    if (state == STATE.PLAYING && count < 0) {
      restore()
    }
  }, [count])
  return <>
    <h1 style={{ textAlign: "center" }}>
      <input type="number"
        style={{
          border: "none",
          textAlign: "center",
          fontSize: "inherit",
          width: "max-content"
        }}
        onFocus={onEdit}
        onBlur={commitOrRollback}
        onKeyDown={e => {
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
        }}
        onChange={override}
        value={state == STATE.EDITING ? raw : count}
      />
    </h1>
  </>
}
