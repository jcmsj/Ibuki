import { createContext, MutableRefObject, PropsWithChildren, useContext, useRef } from "react";
import NoProviderError from "../lib/NoProviderError";

export const MXContext = createContext<MutableRefObject<HTMLAudioElement | undefined>>({ current: undefined })

/**
 * @TODO Initial audio file?
 */
export function MXProvider({children}:PropsWithChildren) {
    const audio = useRef<HTMLAudioElement>();

    return <MXContext.Provider
        value={audio}
    >
        {children}
    </MXContext.Provider>
}

export function useMXContext() {
    return NoProviderError.unless("Music Provider", useContext(MXContext))
}