import { Drill, Item } from "./types";
import { ListItemButton, ListItemText } from "@mui/material";
import { useRoutineContext } from "./RoutineProvider";
import { Tabs, Tab } from "@mui/material"
export interface DrillProps {
    drill: Drill
}
export function DrillNav() {
    const { dispatch, state } = useRoutineContext()
    const onChange = (e: React.SyntheticEvent, n: number) => {
        dispatch({ at: 
            { item: n } 
        })
    };

    return <>
        {/* //TODO: For Mobile Layout
        <Select
            value={state.itemIndex}
            variant="filled"
            onChange={onChange}
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
            value={state.itemIndex}
            onChange={onChange}
            orientation="vertical"
            TabIndicatorProps={{ style: { left: 2 } }}
        >
            {state.drill?.items.map((item, i) => <Tab
                label={item.name}
                key={item.name}
                value={i}
            />)}
        </Tabs>
    </>
}

export default function DefaultDrillNav() {
    const { state } = useRoutineContext()

    if (state.drill) {
        return <DrillNav />
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