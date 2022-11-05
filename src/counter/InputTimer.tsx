import { FormEvent, useCallback, useEffect, useState } from "react";
import { useInterval } from "react-use";
import { useCounter } from "./CounterProvider";
import { usePlayerContext, STATE } from "./PlayerProvider";

/**
 * @implNote in ms
 * @TODO custom interval?
 */
const interval = 1000;

export function InputTimer() {
  const { count, setCount, decrement, last, restore, save} = useCounter();
  const { state, stop, toggle, edit} = usePlayerContext()
  const [raw, setRaw] = useState("")
  useInterval(
    decrement,
    state == STATE.PLAYING ? interval : null
  )
  let input!: HTMLInputElement;

  const tick = useCallback((e: KeyboardEvent) => {
    console.log(e.code, state.toString());
    switch (e.code) {
      case "Space":
        //Suspend listening to space
        if (state != STATE.EDITING)
          toggle()
        break;
      case "Escape":
        stop()
        input.blur()
        restore()
        resync()
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

  useEffect(() => {
    resync()
  }, [count])

  function override(e: FormEvent<HTMLInputElement>) {
    setRaw(e.currentTarget.value)
  }

  function resync() {
    setRaw("" + count) //Restore
  }
  function stopEdit(e: FormEvent<HTMLInputElement>) {
    const stripped = parseInt(e.currentTarget.value.replace(/\D|\./, ""));
    if (isNaN(stripped)) {
      resync()
    } else {
      setCount(stripped)
    }

    stop()
  }

  function onEdit() {
    save()
    edit()
  }
  return <form
    onSubmit={e => {
      e.preventDefault()
      if (state == STATE.EDITING) {
        input.blur()
      }
    }}
  >
    <input
      type="submit"
      hidden
    />
    <h1 style={{ textAlign: "center" }}>
      <input type="number"
        style={{
          border: "none",
          textAlign: "center",
          fontSize: "inherit",
          width: "max-content"
        }}
        ref={me => { if (me) input = me }}
        onBlur={stopEdit}
        onFocus={onEdit}
        onChange={override}
        value={state == STATE.EDITING ? raw : count}
      />
    </h1>
  </form>
}
