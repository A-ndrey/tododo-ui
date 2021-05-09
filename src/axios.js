import axios from "axios";
import {getAccessToken, getNewToken, updateAuthURL} from "@/utils/auth_manager";

export const axiosApiInstance = axios.create({
    baseURL: `${process.env.VUE_APP_BACKEND_HOST || window.location.origin}/api/v1`
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
        const status = error.response ? error.response.status : null
        if (status === 401 && !error.config._retry) {
            error.config._retry = true
            let data = error.response.data
            updateAuthURL(data.authHost, data.authService)
            return getNewToken().then(() => axiosApiInstance(error.config))
        }

        return Promise.reject(error)
    }
)