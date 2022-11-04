import { FormEvent, useEffect } from "react";
import { useCounter } from "./CounterProvider";

export function InputTimer() {
  const { count, setCount, decrement } = useCounter();
  let timer: number = 0;
  const interval = 1000;

  function stop() {
    clearInterval(timer);
    timer = 0;
  }
  function start() {
    timer = setInterval(decrement, interval)
  }
  function tick(e: KeyboardEvent) {
    switch (e.code) {
      case "Space":
        if (timer <= 0) {
          start()
        } else {
          stop()
        }
        break;
      case "Escape":
        stop()
        break;
    }
  }

  //onmount
  useEffect(() => {
    window.addEventListener("keyup", tick);

    return () => {
      window.removeEventListener("keyup", tick);
    }
  }, [])

  function override(e:FormEvent<HTMLInputElement>) {
    setCount(parseInt(e.currentTarget.value))
  }

  return <>
    <br></br>
    <h2>

      <input type="number"
        style={{
          border: "none",
          textAlign: "center",
          fontSize: "inherit"
        }}
        onInput={override}
        value={count} />
    </h2>
  </>;
}
