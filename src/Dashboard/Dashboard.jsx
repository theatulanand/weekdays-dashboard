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
    const [filters, setFilters] = useState({
        roles: [],
        techStack: [],
        experience: undefined,
        companyName: "",
        location: [],
        minBasePay: 0,
    });

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
        console.log(page)
        try {
            setLoading(true);
            const newData = await getData(10 * page, 0, filters, page);
            if (newData.jdList.length === 0 && page < 90) {
                setPage(prevPage => prevPage + 1);
            } else {
                setData(newData.jdList);
                setHasMore(newData.jdList.length > 0 && page < 90);
            }
        } catch (error) {
            console.log(error, "Error while getting data from api");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getJobsData();
    }, [page]);

    useEffect(() => {
        // Initial load
        getJobsData();
    }, []);

    return (
        <Box component="section" sx={{ p: 2, margin: 4 }}>
            <Grid container spacing={2}>
                {data.map((job, index) => (
                    <Grid key={index} ref={index === data.length - 1 ? lastJobCardRef : null} xs={12} sm={6} md={4} lg={3}>
                        <JobCard job={job} />
                    </Grid>
                ))}
            </Grid>
            <Box textAlign={"center"} mt={"20px"}>
                {loading && <CircularProgress />}
            </Box>
        </Box>
    );
};

