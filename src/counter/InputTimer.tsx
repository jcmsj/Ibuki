import { FormEvent, useState } from "react";
import { useInterval } from "react-use";
import { useCounter } from "./CounterProvider";
import { usePlayerContext, STATE } from "./PlayerProvider";

/**
 * @implNote in ms
 * @TODO custom interval?
 */
const interval = 1000;

export function InputTimer() {
  const { count, setCount, decrement, save, restore } = useCounter();
  const { state, stop, edit } = usePlayerContext()
  const [raw, setRaw] = useState("")
  useInterval(
    decrement,
    state == STATE.PLAYING ? interval : null
  )


  function override(e: FormEvent<HTMLInputElement>) {
    setRaw(e.currentTarget.value)
    //Only update count when input is committed
  }

  function resync() {
    setRaw("" + count); //Restore
  }
  function commitOrRollback() {
    const stripped = parseInt(raw.replace(/\D|\./, ""));
    if (isNaN(stripped)) {
      resync()
    } else {
      // Override
      setCount(stripped)
    }

    stop()
  }

  function onEdit() {
    resync()
    save()
    edit()
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
        onFocus={onEdit}
        onBlur={commitOrRollback}
        onKeyDown={e => {
          switch (e.code) {
            case "Enter":
              e.currentTarget.blur()
              break;
            case "Escape":
              stop()
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
