import axios from "axios";

const baseURL = process.env.baseURL || "https://api.weekday.technology"

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "content-type": "application/json",
        Accept: "application/json",
    },
});

export const getDataFromApi = (payload) => axiosInstance.post("/adhoc/getSampleJdJSON", payload);
