import { default as ArrowBack } from "@mui/icons-material/ArrowBack";
import { AppBar, AppBarProps, IconButton, IconButtonProps, Toolbar, ToolbarProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppTitle from "./AppTitle";
import { AuxProps } from "./AuxProps";

function ArrowButton(props:IconButtonProps) {
    return <IconButton
        {...props}
    >
        <ArrowBack />
    </IconButton>;
}

export interface TopBarProps extends AuxProps<AppBarProps>{
    cancellable?: boolean;
    onBack?: () => void;
    title?: string;
    toolBarProps?: ToolbarProps;
}

export default function TopBar({ cancellable=false, onBack, children=undefined, title=undefined, toolBarProps, ...props }:TopBarProps) {
    const navigate = useNavigate();
    const goBack = () => onBack ? onBack() : navigate(-1);
    return <AppBar
        position="sticky"
        sx={theme => theme.palette.mode == "dark" ? {
            background: "black",
        } : {}}
        {...props}
    >
        <Toolbar
            {...toolBarProps}
        >
            {(cancellable ?? onBack) ?
                <ArrowButton
                    onClick={goBack}
                />
                : null
            }
            <AppTitle>{title}</AppTitle>
            {children}
        </Toolbar>
    </AppBar>
}