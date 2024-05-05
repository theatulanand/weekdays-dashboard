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
                (job.minExp <= filterOptions.experience || !job.minExp) &&
                (job.maxExp >= filterOptions.experience || !job.maxExp) &&
                (!filterOptions.companyName || job.companyName.toLowerCase().startsWith(filterOptions.companyName.toLowerCase()))
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