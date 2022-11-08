import { UploadFile } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRoutineContext } from "./RoutineProvider";
import mockData from "../sample/routine.json";

export default function Loader() {
    const {dispatch} = useRoutineContext();

    function onClick(e:any) {
        //TODO: File select like MXInput
        dispatch({routine:mockData})
    }
    return <IconButton onClick={onClick}>
        <UploadFile />
    </IconButton>;
}