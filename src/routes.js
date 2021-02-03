import VueRouter from 'vue-router'
import TaskList from "@/components/tasks/list/TaskList";
import NotFound from "@/components/NotFound";
import NewTask from "@/components/tasks/NewTask";
import EditTask from "@/components/tasks/EditTask";
import TaskView from "@/components/tasks/TaskView";

export default new VueRouter({
    routes: [
        {
            path: '',
            beforeEnter: (to, from, next) => next({name: 'tasks'})
        },
        {
            path: '/tasks',
            name: 'tasks',
            component: TaskList
        },
        {
            path: '/tasks/new',
            name: 'new task',
            component: NewTask
        },
        {
            path: '/tasks/edit/:id',
            props: true,
            name: 'edit task',
            component: EditTask
        },
        {
            path: '/tasks/:id',
            props: true,
            name: 'view task',
            component: TaskView
        },
        {
            path: '/goals',
            name: 'goals',
            component: NotFound
        },
        {
            path: '/user',
            name: 'user',
            component: NotFound
        },
        {
            path: '*',
            name: 'not-found',
            component: NotFound
        }
    ],
    mode: 'history'
})
