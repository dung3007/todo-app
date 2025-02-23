import { TextField } from "@mui/material";

const Search = ({ searchValue,setSearchValue}) => {

    return (
        <div>
            <TextField
                value={searchValue}
                className="w-full"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Tìm kiếm..."
            />
        </div>
    )
}

export default Search;