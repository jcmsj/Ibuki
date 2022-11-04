import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import { AuxProps } from "./AuxProps";

export function Theme({ children, ...props }:AuxProps) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
    return <ThemeProvider 
        theme={theme}
        {...props}
    >
        {children}
    </ThemeProvider>
}