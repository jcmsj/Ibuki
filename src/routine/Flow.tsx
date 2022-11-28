import { Drill, Item } from "./types";
import { useRoutineContext } from "./RoutineProvider";
import { MenuItem, Select, SelectChangeEvent, Button, ButtonGroup, ButtonProps, Typography } from "@mui/material"
import "./Switcher.sass"
import { default as NavigateBefore } from "@mui/icons-material/NavigateBefore";
import {default as NavigateNext} from "@mui/icons-material/NavigateNext"
import { useEvent } from "react-use";
import { useCallback } from "react";
export interface DrillProps {
    drill: Drill
}
export function Switcher() {
    const { dispatch, state } = useRoutineContext()
    function jumpTo(n: number) {
        dispatch({
            at:
                { item: n }
        })
    }
    const onChange = (e: SelectChangeEvent<number>) => {
        jumpTo(e.target.value as number);
    };
    
    const nxt = useCallback(() => {
        dispatch({next:{item:true}})
    }, [])
    const prv = useCallback(() => {
        jumpTo(Math.max(0,state.itemIndex! - 1))
    }, [state.itemIndex])
    
    useEvent("keyup", e => {
        switch(e.code) {
            case "ArrowRight":
                nxt()
            break;
            case "ArrowLeft":
                prv()
            break;
        }
    })

    return <ButtonGroup
        className="switcher"
    >
        <Skip
            item={state.drill?.items[state.itemIndex! - 1]}
            endIcon={<NavigateBefore />}
            onClick={prv}
        />
        <Select
            value={state.itemIndex}
            variant="outlined"
            onChange={onChange}
        >
            {state.drill?.items.map((item, i) => <MenuItem
                value={i}
                key={item.name}
            >
                {item.name}
            </MenuItem>)}
        </Select>
        <Skip
            item={state.drill?.items[state.itemIndex! + 1]}
            startIcon={<NavigateNext />}
            onClick={nxt}
        />
    </ButtonGroup>
}

export function Skip({ item, ...props }: ButtonProps & { item?: Item }) {
    return <>
        <Button
            disabled={!item}
            {...props}
        >
            {item ? item.name : "None"}
        </Button>
    </>
}
export default function Flow() {
    const { state } = useRoutineContext()

    if (state.drill) {
        return <Switcher />
    }

    return <>
    <Typography variant="h6" color="HighlightText">
        No drill
    </Typography>
    </>
}