import { createContext, Dispatch, MutableRefObject, PropsWithChildren, SetStateAction, useContext, useRef, useState } from "react";
import NoProviderError from "../lib/NoProviderError";

interface MXContextProps {
    audio:MutableRefObject<HTMLAudioElement|undefined>
    startAt: number;
    setStart:Dispatch<SetStateAction<number>>
}

export const MXContext = createContext<MXContextProps | undefined>(undefined);

interface MXProviderProps extends PropsWithChildren{
    initial?: number;
}

/**
 * @TODO Initial audio file?
 */
export function MXProvider({ children, initial=0 }: MXProviderProps) {
    const audio = useRef<HTMLAudioElement>();
    const [startAt, setStart] = useState(initial)
    return <MXContext.Provider
        value={{audio, startAt, setStart}}
    >
        {children}
    </MXContext.Provider>
}

export function useMXContext() {
    return NoProviderError.unless("Music Provider", useContext(MXContext))
}