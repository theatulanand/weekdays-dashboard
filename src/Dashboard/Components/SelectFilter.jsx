import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectFilter({ options, value, setValue, label, filterName }) {

    const handleChange = (event) => {
        setValue(
            (prev) => {
                return {
                    ...prev,
                    [filterName]: event.target.value
                }
            }
        )
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={value[filterName]}
                    onChange={handleChange}
                    autoWidth
                    label={label}
                >
                    <MenuItem value={undefined} minWidth={200}>
                        <em>None</em>
                    </MenuItem>
                    {
                        options.map((option) => {
                            return (
                                <MenuItem key={option} value={option} minWidth={200}>
                                    {option}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
        </div>
    );
}
