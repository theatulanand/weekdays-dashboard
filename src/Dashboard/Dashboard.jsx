import React, { useEffect, useState, useRef, useCallback } from 'react';
import { filterData, getData } from './Actions/getData'; // Assuming getData fetches data
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import JobCard from './Components/JobCard';
import { CircularProgress } from '@mui/material';
import { Filters } from './Components/Filters';

export const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(0); // Initial page set to 0
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
        try {
            setLoading(true);
            const newData = await getData(10, page, filters); // Fetch 10 jobs per page
            setData(prevData => [...prevData, ...newData.jdList]);
            const newFilteredData = filterData([...data, ...newData.jdList], filters);
            setFilteredData(newFilteredData);
            setHasMore(page < Math.floor(newData.totalCount / 10)); // Check filtered data length
        } catch (error) {
            console.log(error, "Error while getting data from api");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(0);
    }, [filters]); // Update on filters change

    useEffect(() => {
        // Fetch data on initial load and page change
        getJobsData();
    }, [page, filters]);

    return (
        <Box component="section" sx={{ p: 2, margin: 4 }}>
            <Box spacing={2}>
                <Filters filters={filters} setFilters={setFilters} /> {/* Assuming Filters component */}
            </Box>
            {
                filteredData.length === 0 ? <Box>No Data Found</Box> : <>
                    <Grid container spacing={2}>
                        {filteredData.map((job, index) => (
                            <Grid key={index} ref={index === filteredData.length - 1 ? lastJobCardRef : null} xs={12} sm={6} md={4} lg={3}>
                                <JobCard job={job} />
                            </Grid>
                        ))}
                    </Grid>
                    <Box textAlign="center" mt={2}>
                        {loading && <CircularProgress />}
                    </Box>
                </>
            }
        </Box>
    );
};
