import { Search as SearchIcon } from "@mui/icons-material";
import { InputOutline } from "./InputOutline";

export function SearchBar({...props }) {
    return <InputOutline
        className="search-bar"
        InputProps={
            {
                startAdornment:
                    <SearchIcon />,
            }
        }
        {...props}
    />
}
