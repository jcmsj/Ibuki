import { default as UploadFile } from "@mui/icons-material/UploadFile";
import { IconButton } from "@mui/material";
import { useRoutineContext } from "./RoutineProvider";
import { ChangeEvent } from "react";
import { Routine } from "./types";

export default function Loader() {
    const {dispatch} = useRoutineContext();
    let input:HTMLInputElement;
    function onClick(e:any) {
        input?.click()
    }

    async function load(e:ChangeEvent<HTMLInputElement>) {
        if (e.target.files?.length) {
            const file = e.target.files[0]
            const routine = JSON.parse(await file.text()) as Routine
            dispatch({routine})
        }
    }
    return <IconButton onClick={onClick}>
        <UploadFile />
        <input type="file" name="routine" id="routine-loader" onChange={load} ref={me =>{if (me) input = me}} accept="application/json" hidden />
    </IconButton>;
}