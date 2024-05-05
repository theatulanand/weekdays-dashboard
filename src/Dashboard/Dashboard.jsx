import React, { useEffect } from 'react'
import { getData } from './Actions/getData'

export const Dashboard = () => {

    useEffect(() => {
        getData(10, 0);
    }, [])

    return (
        <div>Dashboard</div>
    )
}
