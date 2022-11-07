import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import NoProviderError from "../lib/NoProviderError";
import { Routine } from "./types";

export interface RoutineContextProps {
    routine?: Routine,
    setRoutine:Dispatch<SetStateAction<Routine | undefined>>
}
export const RoutineContext = createContext<RoutineContextProps | undefined>(undefined)

export function useRoutineContext() {
    return NoProviderError.unless("Routine context", useContext(RoutineContext))
}

export default function RoutineProvider({ children }: PropsWithChildren) {
    const [routine, setRoutine] = useState<Routine>()
    return <RoutineContext.Provider
        value={{routine, setRoutine}}
    >
        {children}
    </RoutineContext.Provider>
}