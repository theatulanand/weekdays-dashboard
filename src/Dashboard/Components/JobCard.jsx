import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';


export default function JobCard({ job }) {
    const { companyName, jobRole, location, logoUrl, minExp, jobDetailsFromCompany } = job
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <Card sx={{ maxWidth: 345, borderRadius: "20px", border: "1px solid #f0f0f0", boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px" }}>
            <CardHeader
                avatar={
                    <Avatar src={logoUrl} aria-label="recipe" alt='logo' />
                }
                title={companyName}
                subheader={
                    <React.Fragment>
                        <Typography variant="subtitle1" fontWeight={"400"} color={"black"}>
                            {capitalizeFirstLetter(jobRole)}
                        </Typography>
                        <Typography variant="subtitle2" color="black">
                            {capitalizeFirstLetter(location)}
                        </Typography>
                    </React.Fragment>
                }
                titleTypographyProps={{ fontSize: "13px", fontWeight: "600", letterSpacing: "1px", marginBottom: "3px", color: "#8b8b8b" }}
            />
            <CardContent>
                <Typography variant="body2" color="black" marginBottom={"10px"} fontWeight={"600"}>
                    About Company:
                </Typography>
                <Typography variant="body2" color="gray" height={"100px"} overflow={'hidden'}>
                    {jobDetailsFromCompany}
                </Typography>
            </CardContent>
            <Box disableSpacing sx={{ justifyContent: "center" }}>
                <Typography style={{
                    cursor: "pointer",
                    color: "#4943da",
                    fontSize: "14px",
                    fontWeight: "400"
                }} paragraph sx={{
                    textAlign: "center"
                }}>Show More</Typography>
            </Box>
            <Box sx={{ justifyContent: "center", padding: "15px" }}>
                <Typography variant="body2" sx={{
                    "fontSize": "13px",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    marginBottom: "3px",
                    color: "#8b8b8b",
                    marginBottom: "10px"
                }}>Minimum Experience</Typography>
                <Typography variant="body2" sx={{
                    "fontSize": "14px",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    marginBottom: "3px",
                    color: "Black",
                    marginBottom: "10px"
                }}>{!minExp ? "0 Years" : `${minExp} Years`}</Typography>
                <Button variant="contained" sx={{
                    width: "100%",
                    backgroundColor: "rgb(85, 239, 196)",
                    color: "black",
                    padding: "8px 18px",
                    border: "none",
                    boxShadow: "none",
                    fontWeight: "500",
                    textTransform: "none",
                    ":hover": {
                        backgroundColor: "rgb(85, 239, 196)",
                        boxShadow: "none",
                    }
                }}> ⚡ Easy Apply</Button>
            </Box>
        </Card>
    );
}
