import { Typography, TypographyProps } from "@mui/material"
import { AuxProps } from "./AuxProps";

export default function AppTitle({ 
    children, 
    ...props }: AuxProps<TypographyProps>) {
    return <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} {...props}>
        {children}
    </Typography>;
}