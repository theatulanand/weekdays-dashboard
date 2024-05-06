
import React, { useState } from 'react'
import MultipleSelect from './Multiselect'
import { Grid } from '@mui/material'
import SelectFilter from './SelectFilter'

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
    const cityOptions = [
        {
            label: 'Delhi NCR',
            value: 'delhi ncr'
        },
        {
            label: 'Gurugram',
            value: 'gurugram'
        },
        {
            label: 'Noida',
            value: 'noida'
        },
        {
            label: 'Mumbai',
            value: 'mumbai'
        },
        {
            label: 'Chennai',
            value: 'chennai'
        }
    ]
    const experienceOptions = new Array(10).fill(0).map((_, i) => i + 1);
    const basePayOptions = new Array(10).fill(0).map((_, i) => (i + 1) * 10);
    return (
        <Grid container mb={2}>
            <MultipleSelect options={roleOptions} value={filters} setValue={setFilters} label="Role" filterName='roles' />
            <MultipleSelect options={cityOptions} value={filters} setValue={setFilters} label="Location" filterName='location' />
            <SelectFilter options={experienceOptions} value={filters} setValue={setFilters} label="Experience" filterName='experience' />
            <SelectFilter options={basePayOptions} value={filters} setValue={setFilters} label="Min Base Pay" filterName='minBasePay' />
        </Grid>
    )
}
