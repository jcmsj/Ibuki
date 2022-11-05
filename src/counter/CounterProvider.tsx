import { createContext, useContext, Dispatch, PropsWithChildren, SetStateAction, useState, useCallback } from "react";
import NoProviderError from "../lib/NoProviderError";

export interface CounterContext {
    count: number;
    last: number;
    setCount: Dispatch<SetStateAction<number>>;
    increment: () => void;
    decrement: () => void;
    setLast: Dispatch<SetStateAction<number>>;
    restore:()=>void;
    save:()=>void;
}

export const counterContext = createContext<CounterContext | undefined>(undefined);

export function CounterProvider({ initial = 0, children }: { initial?: number } & PropsWithChildren) {
    const [count, setCount] = useState(initial);
    const [last, setLast] = useState(count)

    const restore=useCallback(() => {
        setCount(last)
    }, [last])

    const save = useCallback(() => {
        setLast(count)
    },[count])
    const context = {
        count,
        last,
        setCount,
        setLast,
        decrement() {
            setCount(c => c - 1)
        },
        increment() {
            setCount(c => c + 1)
        },
        restore,
        save
    }

    return <counterContext.Provider value={context}>
        {children}
    </counterContext.Provider>
}

export function useCounter() {
    return NoProviderError.unless("Counter Context", useContext(counterContext))
}