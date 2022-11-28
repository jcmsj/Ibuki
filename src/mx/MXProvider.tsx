import { createContext, Dispatch, MutableRefObject, PropsWithChildren, SetStateAction, useContext, useRef, useState } from "react";
import NoProviderError from "../lib/NoProviderError";

interface MXContextProps {
    audio:MutableRefObject<HTMLAudioElement|undefined>
    startAt: number;
    loop:boolean;
    setLoop:Dispatch<SetStateAction<boolean>>;
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
    const [loop, setLoop] = useState(false)
    const [startAt, setStart] = useState(initial)
    return <MXContext.Provider
        value={{audio, startAt, setStart, loop, setLoop}}
    >
        {children}
    </MXContext.Provider>
}

export function useMXContext() {
    return NoProviderError.unless("Music Provider", useContext(MXContext))
}