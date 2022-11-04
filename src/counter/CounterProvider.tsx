import { createContext, useContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

interface CounterContext {
    count: number;
    setCount: Dispatch<SetStateAction<number>>;
    increment: () => void;
    decrement: () => void;
}

export const CounterContext = createContext({
    count: 0,
    setCount(n: number) {
        this.count = n
    },
    increment() {
        this.count++
    },
    decrement() {
        this.count--
    }
});

export function CounterProvider({ initial = 0, children }:{initial?:number} & PropsWithChildren) {
    const [count, setCount] = useState(initial);
    const context = {
        count,
        setCount,
        decrement() {
            setCount(c => c - 1)
        },
        increment() {
            setCount(c => c + 1)
        }
    }
    return <CounterContext.Provider value={context}>
        {children}
    </CounterContext.Provider>
}

export function useCounter() { 
    return useContext(CounterContext); 
}