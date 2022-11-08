import { Drill, Item } from "./types";
import { List, ListItemButton, ListItemText, MenuItem, Select } from "@mui/material";
import { useRoutineContext } from "./RoutineProvider";
import { Tabs, Tab, NativeSelect } from "@mui/material"
import { useEffect, useState } from "react";
export interface DrillProps {
    drill: Drill
}
export function DrillNav({ drill }: DrillProps) {
    const {dispatch} = useRoutineContext()
    const [active, setActive] = useState(0)
    const onChange = (e: React.SyntheticEvent, n: number) => {
        setActive(n);
    };

    useEffect(() => {
        /* 
        TODO: Decide whether to reset from 0
        if (drill.items.length < active) {
        } */
        setActive(0)
    }, [drill])
    return <>
        {/* 
        TODO: For Mobile Layout
        <Select
            value={active}
            variant="filled"
            onChange={e => setActive(e.target.value as number)}
            fullWidth={true}
            style={{width:"100%"}}
        >
            {drill.items.map((item, i) => <MenuItem
                value={i}
                key={item.name}
            >
                {item.name}
            </MenuItem>)}
        </Select> */}
        <Tabs
            value={active}
            onChange={onChange}
            orientation="vertical"
            TabIndicatorProps={{ style: { left: 2 } }}
        >
            {drill.items.map(item => <Tab
                onClick={e => {dispatch({item}); e.stopPropagation()}}
                label={item.name}
                key={item.name}
            />)}
        </Tabs>
    </>
}

export default function DefaultDrillNav() {
    const { state } = useRoutineContext()
    
    if (state.routine && state.drill) {
        return <DrillNav
            drill={state.drill}
        />
    }

    return <>
        No drill
    </>
}
export interface ItemProps {
    item: Item
}

export function ItemUI({ item }: ItemProps) {
    return <ListItemButton
        onClick={e => console.log(item.media)}
        sx={theme => ({
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.mode == "dark" ? "#191919" : "auto",
        })}

    >
        <ListItemText>
            {item.name}
        </ListItemText>
    </ListItemButton>
}