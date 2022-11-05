import { Dispatch, SetStateAction, createContext, useState, useContext } from "react";
import { AuxProps } from "../components/AuxProps";
import NoProviderError from "../lib/NoProviderError";

export enum STATE {
  HALTED,
  PLAYING,
  EDITING
}

export interface PlayerContext {
  state:STATE;
  setState:Dispatch<SetStateAction<STATE>>;
  start:()=>void;
  stop:()=>void;
  edit:()=>void;
  toggle:()=>void;
}

export const playerContext = createContext<PlayerContext | undefined>(undefined)

/**
 * @internal
 */
export function makePlayerState() {
  const [state, setState] = useState(STATE.HALTED);
  return {
    state,
    setState,
    start() {
      setState(STATE.PLAYING)
    },
    edit() {
      setState(STATE.EDITING)
    },
    stop() {
      setState(STATE.HALTED)
    },
    toggle() {
      setState(s => s == STATE.PLAYING ? STATE.HALTED : STATE.PLAYING)
    }
  }
}

export function usePlayerContext() {
  return NoProviderError.unless("Player Context", useContext(playerContext));
}

export function PlayerProvider({ children, props }: AuxProps) {
  const state = makePlayerState();
  return <playerContext.Provider
    value={state}
    {...props}
  >
    {children}
  </playerContext.Provider>;
}