import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import NoProviderError from "../lib/NoProviderError";
import { indexAtMod } from "../lib/indexAtMod";
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
    drill?: number;
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
 * @see implNote of {@link reducer}
 */
export function nextFlow(state: RoutineState, next: NextFlow): RoutineState | undefined {
    if (!state.drill) {
        return undefined;
    }
    const cDrill = state.drill;
    if (next.item) {
        //DO NOT WRAP INDEX
        const item = cDrill.items.at(state.itemIndex! + 1)
        if (item) {
            return { ...state, item, itemIndex: state.itemIndex! + 1 };
        }

        //when overflow
        next.drill = true;
    }

    if (state.routine && next.drill) {
        const { routine } = state;
        const { drills } = routine;
        let drill: Drill | undefined;
        let index = drills.indexOf(cDrill);

        if (typeof index == "number") {
            drill = indexAtMod(drills)(index)
        }

        if (drill) {
            return { ...state, drill, itemIndex: index }
        }
    }

    return undefined;
}

/**
 * @see implNote of {@link reducer}
 */
export function jumpTo(state: RoutineState, p: Position): RoutineState | undefined {
    if (p.drill) {
        const drill = indexAtMod(state.routine?.drills || [])(p.drill || 0)


        if (drill) {
            state.drill == drill;
            p.item = 0;
        }
    }

    if (typeof p.item == "number") {
        const index = p.item % state.drill?.items.length!;

        const item = state.drill?.items.at(index)
        //TODO: Handle undef item
        return { ...state, item, itemIndex: index }
    }

    return undefined;
}

/**
 * @implNote Check order of each props are important
 */
export function reducer(state: RoutineState, action: ActionProps) {
    if (action.at) {
        const result = jumpTo(state, action.at)
        if (result)
            return result;
    }
    if (action.next) {
        const result = nextFlow(state, action.next)
        if (result)
            return result;
    }

    if (action.routine) {
        state.routine = action.routine;
        action.drill = action.routine.drills[0]
    }

    if (action.drill) {
        state.drill = action.drill;
        action.item = action.drill.items[0]
    }

    if (action.item) {
        const i = state.drill?.items.indexOf(action.item);

        if (typeof i == "number") {
            return { ...state, item: action.item, itemIndex: i }
        }
    }

    console.warn("Unhandled action");
    console.trace(action)
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