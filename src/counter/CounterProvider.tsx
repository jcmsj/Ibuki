import { createContext, useContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import NoProviderError from "../lib/NoProviderError";
import prepSync from "../lib/prepSync";

export interface CounterContext {
    count: number;
    last: number;
    setCount: Dispatch<SetStateAction<number>>;
    inc: () => void;
    dec: () => void;
    setLast: Dispatch<SetStateAction<number>>;
    restore: () => void;
    save: () => void;
}

export const counterContext = createContext<CounterContext | undefined>(undefined);

export function CounterProvider({ initial = 0, children }: { initial?: number } & PropsWithChildren) {
    const [count, setCount] = useState(initial);
    const [last, setLast] = useState(count)
    
    const ct: CounterContext = {
        count,
        last,
        setCount,
        setLast,
        dec() {
            setCount(c => c - 1)
        },
        inc() {
            setCount(c => c + 1)
        },
        restore:prepSync(setLast, setCount),
        save:prepSync(setCount, setLast)
    }
    return <counterContext.Provider value={ct} >
        {children}
    </counterContext.Provider >
}

export function useCounter() {
    return NoProviderError.unless("Counter Context", useContext(counterContext))
}