import axios from "axios";
import {getAccessToken, getNewToken} from "@/utils/token_storage";

export const axiosApiInstance = axios.create({
    baseURL: `${process.env.VUE_APP_BACKEND_HOST}/api/v1`
})

axiosApiInstance.interceptors.request.use(
    async config => {
        config.headers = {
            'Authorization': `Bearer ${getAccessToken()}`
        }
        return config
    },
    error => Promise.reject(error)
)

axiosApiInstance.interceptors.response.use(
    response => response,
    async error => {
        if (error.response.status === 401 && !error.config._retry) {
            error.config._retry = true
            await getNewToken()
            return axiosApiInstance(error.config)
        }

        return Promise.reject(error)
    }
)