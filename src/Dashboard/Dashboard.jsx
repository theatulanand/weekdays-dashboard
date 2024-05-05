import React, { useEffect } from 'react'
import { getData } from './Actions/getData'

export const Dashboard = () => {

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>Dashboard</div>
    )
}
