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

export const authConfig = {
    host: "",
    port: 80,
    service: "",
    protocol: "http",
    refreshURL() {
        return `${this.protocol}://${this.host}:${this.port}/api/v1/refresh`
    },
    loginURL(redirectURL) {
        return `${this.protocol}://${this.host}:${this.port}/web/signin?service=${this.service}&redirect_url=${redirectURL}`
    }
}

export const updateAuthURL = (host, port, service) => {
    authConfig.host = host
    authConfig.port = port
    authConfig.service = service
    if (port === 443) {
        authConfig.protocol = "https"
    } else {
        authConfig.protocol = "http"
    }
}

export const getNewToken = () => axios.post(authConfig.refreshURL(), {refresh_token: getRefreshToken()})
    .then(response => {
        setAccessToken(response.data.access_token)
        setRefreshToken(response.data.refresh_token)
    })
    .catch(error => {
        if (error.response.status === 401) {
            clear()
        }
    })

