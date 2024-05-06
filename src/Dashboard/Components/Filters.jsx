import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { useState } from 'react'
import MultipleSelect from './Multiselect'

export const Filters = ({ filters, setFilters }) => {
    const roleOptions = [
        {
            label: 'Frontend Developer',
            value: 'frontend'
        },
        {
            label: 'Backend Developer',
            value: 'backend'
        },
        {
            label: 'Android Developer',
            value: 'android'
        },
        {
            label: 'IOS Developer',
            value: 'ios'
        },
        {
            label: 'Tech Lead',
            value: 'tech lead'
        }
    ]
    return (
        <Grid2>
            <MultipleSelect options={roleOptions} value={filters} setValue={setFilters} label="Role" filterName='roles' />
        </Grid2>
    )
}
