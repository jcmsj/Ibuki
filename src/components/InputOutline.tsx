import { TextField, TextFieldProps } from "@mui/material";

export function InputOutline(props:TextFieldProps) {
    return <TextField
        required
        variant="outlined"
        {...props}
    />;
}
