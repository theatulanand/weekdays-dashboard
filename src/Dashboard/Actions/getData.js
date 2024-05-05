import { getDataFromApi } from "../../Http"

export const getData = async (limit, offset, filterOptions) => {
    try {
        const payLoad = {
            limit,
            offset
        }
        let res = await getDataFromApi(payLoad);
        const filteredData = res.data.jdList.filter(job => {
            return (
                (filterOptions.roles.includes(job.jobRole) || filterOptions.roles.length === 0) &&
                (filterOptions.techStack.includes(job.jobRole) || filterOptions.techStack.length === 0) &&
                ((!filterOptions.experience && filterOptions.experience !== 0) || // Check if experience is undefined or null
                    (job.minExp <= filterOptions.experience || !job.minExp)) && // Apply filter only if experience is defined
                (job.maxExp >= filterOptions.experience || !job.maxExp || // Apply filter only if experience is defined
                    (!filterOptions.companyName || job.companyName.toLowerCase().startsWith(filterOptions.companyName.toLowerCase()))) &&
                (job.minJdSalary >= filterOptions.minBasePay || !filterOptions.minBasePay) && // Apply filter only if minBasePay is defined
                (filterOptions.location.length === 0 || filterOptions.location.includes(job.location)) // Apply location filter
            );

        });

        console.log(filteredData)

        return {
            jdList: filteredData
        }
    } catch (error) {
        console.log(error, "Error while getting data from api")
    }
}