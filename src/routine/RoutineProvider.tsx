import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import NoProviderError from "../lib/NoProviderError";
import { Drill, Item, Routine } from "./types";

export interface RoutineState {
    routine?: Routine,
    drill?: Drill,
    item?: Item
    itemIndex?: number
}
export const routineContext = createContext<RoutineContext | undefined>(undefined)

export interface RoutineContext {
    state: RoutineState;
    dispatch: React.Dispatch<ActionProps>;
}

export function useRoutineContext() {
    return NoProviderError.unless("Routine context", useContext(routineContext))
}


interface Position {
    drill?: string | number;
    item?: number;
}

interface NextFlow {
    drill?: boolean;
    item?: boolean;
}

export interface ActionProps {
    drill?: Drill;
    item?: Item;
    routine?: Routine;
    at?: Position;
    next?: NextFlow;
}

/**
 * @TODO Document priority
 */
function reducer(state: RoutineState, action: ActionProps) {
    
    if (action.drill) {
        return { ...state, drill: action.drill }
    }

    if (action.item) {
        const i = state.drill?.items.indexOf(action.item);
        console.log({i, item:action.item});
        
        if (i) {
            return { ...state, item: action.item, itemIndex: i }
        }
    }

    if (action.routine) {
        return {
            routine: action.routine,
            drill: action.routine.warmup,
            item: action.routine.warmup.items[0],
            itemIndex:0
        }
    }

    //console.warn("Unhandled action");
    //console.trace(action)
    return state;
}
export default function RoutineProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(reducer, {})
    return <routineContext.Provider
        value={{ state, dispatch }}
    >
        {children}
    </routineContext.Provider>
}