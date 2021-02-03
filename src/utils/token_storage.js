import axios from "axios";

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

export const getAccessToken = () => localStorage[ACCESS_TOKEN]
const getRefreshToken = () => localStorage[REFRESH_TOKEN]

export const setAccessToken = (token) => localStorage[ACCESS_TOKEN] = token
export const setRefreshToken = (token) => localStorage[REFRESH_TOKEN] = token

const clear = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
}

const url = `${process.env.VUE_APP_AUTH_SERVICE_HOST}/api/v1/refresh`

export const getNewToken = () => axios.post(url, {refresh_token: getRefreshToken()})
    .then(response => {
        setAccessToken(response.data.access_token)
        setRefreshToken(response.data.refresh_token)
    })
    .catch(error => {
        if (error.response.status === 401) {
            clear()
        }
    })

