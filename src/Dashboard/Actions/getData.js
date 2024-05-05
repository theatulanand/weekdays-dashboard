import { getDataFromApi } from "../../Http"

export const getData = async (limit, offset) => {
    try {
        const payLoad = {
            limit,
            offset
        }
        let res = await getDataFromApi(payLoad);
        console.log(res.data)
    } catch (error) {
        console.log(error, "Error while getting data from api")
    }
}