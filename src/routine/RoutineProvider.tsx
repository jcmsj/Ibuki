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


function nextFlow(state: RoutineState, next: NextFlow): RoutineState | undefined {
    if (!state.drill) {
        return undefined;
    }
    const cDrill = state.drill;
    if (next.item) {
        const item = cDrill?.items.at(state.itemIndex!)
        if (item) {
            const i = cDrill?.items.indexOf(item);

            if (i)
                return { ...state, item, itemIndex: i };

            return nextFlow(state, { drill: true })
        }

        console.warn("Index overflow", next)
    }

    if (next.drill) {
        const name = cDrill.name;
        const { routine } = state;
        let index: number | undefined;

        if (name == "warmup") {
            index = 0;
        }
        if (name == "cooldown") {
            return { ...state, drill:routine?.warmup }
        } else {
            index = routine?.drills.indexOf(cDrill);
            /* const i = 
            if (i)
                drill = routine?.drills.at(i + 1); */
        }

        if (index) {
            return jumpTo(state, { drill: index });
        }
    }

    return undefined;
}

function jumpTo(state: RoutineState, p: Position): RoutineState | undefined {
    if (p.drill) {
        const at = p.drill;
        let drill: Drill | undefined;
        if (typeof at == "string") {
            if (at == "warmup" || at == "cooldown") {
                drill = state.routine![at];
            } else {
                drill = state.routine?.drills.find(d => d.name == "at")
            }
        } else if (!isNaN(at)) {
            drill = state.routine?.drills.at(at)
        }

        if (drill) {
            return { ...state, drill }
        }
    }

    if (typeof p.item == "number") {
        const index = p.item
        
        const item = state.drill?.items.at(index)
        //TODO: Handle undef item
        return { ...state, item, itemIndex: index }
    }

    return undefined;
}

/**
 * @TODO Document priority
 */
function reducer(state: RoutineState, action: ActionProps) {
    if (action.at) {
        const result = jumpTo(state, action.at)
        if (result)
            return result;
    }
    if(action.next) {
        const result = nextFlow(state, action.next)
        if (result)
            return result;
    }

    if (action.drill) {
        return { ...state, drill: action.drill }
    }

    if (action.item) {
        const i = state.drill?.items.indexOf(action.item);
        
        if (typeof i == "number") {
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