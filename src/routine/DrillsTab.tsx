import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useRoutineContext } from "./RoutineProvider";

export default function DrillsTab() {
    const { state, dispatch } = useRoutineContext();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (state.routine && state.routine.drills) {
            setIndex(state.routine.drills.findIndex(d => d.name == state.drill!.name))
        }

    }, [state.drill])
    return <>
        <Tabs
            onChange={(e, newValue) => {
                setIndex(newValue)
            }}
            value={index}
        >
            {state.routine?.drills.map((d, i) => <Tab
                key={d.name}
                label={d.name}
                value={i}
                onClick={() => {
                    if (i != index)
                        dispatch({ drill: d })
                }}
            />)}
        </Tabs>

    </>
}