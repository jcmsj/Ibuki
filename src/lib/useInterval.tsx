import { useEffect, useRef } from "react";

/**
 * @desc Hook whose args follows setInterval. Changing delay to nullish value pauses the interval like react-use's useInterval.
 * @TODO Try the tests from react-use's 
 */
export function useInterval(cb: Function, delay?: number, ...args: any[]) {
  const timer = useRef(0);

  useEffect(() => {
    if (typeof delay == "number") {
      timer.current = setInterval(cb, delay, args);
    } else {
      clearInterval(timer.current);
      timer.current = 0;
    }
    return () => clearInterval(timer.current);
  }, [delay]);
}

export default useInterval;