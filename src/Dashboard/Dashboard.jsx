import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getData } from './Actions/getData';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import JobCard from './Components/JobCard';
import { CircularProgress } from '@mui/material';

export const Dashboard = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1); // Initial page set to 1
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const lastJobCardRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const getJobsData = async () => {
        try {
            setLoading(true);
            const res = await getData(10 * page, 0);
            setData(res.jdList);
            setHasMore(res.jdList.length > 0);
        } catch (error) {
            console.log(error, "Error while getting data from api");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (page > 1) {
            getJobsData();
        }
    }, [page]);

    useEffect(() => {
        // Initial load
        getJobsData();
    }, []);

    return (
        <Box component="section" sx={{ p: 2, margin: 4 }}>
            <Grid container spacing={2}>
                {data.map((job, index) => {
                    if (data.length === index + 1) {
                        return (
                            <Grid key={index} ref={lastJobCardRef} xs={12} sm={6} md={4} lg={3}>
                                <JobCard job={job} />
                            </Grid>
                        );
                    } else {
                        return (
                            <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                                <JobCard job={job} />
                            </Grid>
                        );
                    }
                })}
            </Grid>
            <Box textAlign={"center"} mt={"20px"}>
                {loading && <CircularProgress />}
            </Box>
        </Box>
    );
};
