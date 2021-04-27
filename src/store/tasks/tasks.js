import {axiosApiInstance} from '@/axios'
import sorting from "@/store/tasks/sorting"
import filtration from "@/store/tasks/filtration"

export default {
    namespaced: true,
    modules: {
        sorting,
        filtration
    },
    state: {
        tasks: [],
    },
    getters: {
        actual: state => state.tasks.filter(task => !task.isDone),
        done: state => state.tasks.filter(task => task.isDone),
        findById: state => id => Object.assign({}, state.tasks.find(task => task.id === id)),
        allTasks: state => state.tasks.objCopy(),
    },
    mutations: {
        changeStatus: (state, taskId) => {
            const task = state.tasks.find(task => task.id === taskId)
            task.isDone = !task.isDone
        },
        assign: (state, tasks) => state.tasks = tasks,
        insert: (state, task) => state.tasks.push(task),
        delete: (state, taskId) => state.tasks = state.tasks.filter(task => task.id !== taskId),
        update: (state, task) => state.tasks = state.tasks.replace(t => t.id === task.id, task),
    },
    actions: {
        fetch: async ({commit}) => {
            axiosApiInstance.get('/tasks/')
                .then(resp => commit('assign', resp.data))
                .catch(console.log)
        },
        changeStatus: async ({commit, getters}, taskId) => {
            const task = getters.findById(taskId)
            task.isDone = !task.isDone
            axiosApiInstance.put('/tasks/', task)
                .then(() => commit('changeStatus', taskId))
                .catch(console.log)
        },
        create: async ({commit}, task) => {
            axiosApiInstance.post('/tasks/', task)
                .then(response => commit('insert', response.data))
                .catch(console.log)
        },
        delete: async ({commit}, taskId) => {
            axiosApiInstance.delete(`/tasks/${taskId}`)
                .then(() => commit('delete', taskId))
                .catch(console.log)
        },
        update: async ({commit}, task) => {
            axiosApiInstance.put('/tasks/', task)
                .then(() => commit("update", task))
                .catch(console.log)
        }
    }
}