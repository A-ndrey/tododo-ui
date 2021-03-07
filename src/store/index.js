import Vue from 'vue'
import Vuex from 'vuex'
import tasks from "@/store/tasks/tasks";
import {authConfig, setAccessToken, setRefreshToken} from "@/utils/auth_manager";
import {axiosApiInstance} from "@/axios";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        tasks
    },
    state: {
        username: '',
        loggedIn: true,
    },
    getters: {
        username: state => state.username,
        isLoggedIn: state => state.loggedIn
    },
    mutations: {
        username: (state, username) => state.username = username,
        login: (state) => state.loggedIn = true,
        logout: (state) => state.loggedIn = false
    },
    actions: {
        getUsername: async ({commit}) => {
            axiosApiInstance.get('/user/username')
                .then(response => commit('username', response.data.username))
                .catch(err => {
                    if (err.response && err.response.status === 401) {
                        commit('logout')
                    }
                })
        },
        login: async ({commit}) => {
            window.open(
                authConfig.loginURL(window.location.origin + window.location.pathname),
                'login',
                'width=600,height=800'
            )
            window.onhashchange = function() {
                window.onhashchange = null
                const hashParams = new URLSearchParams(window.location.hash.substring(1))
                setAccessToken(hashParams.get('access_token'))
                setRefreshToken(hashParams.get('refresh_token'))
                window.location.hash = ''
                commit('login')
            }
        },
    }
})