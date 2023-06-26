import {Provider} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {v1} from "uuid";
import App, {TasksStateType} from "../App";
import {TaskStatuses} from "../api/todolist-api";
import {TodolistDomainType, todolistsReducer} from "../state/todolists-reducer";
import {appReducer, InitialStateType} from "../state/app-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import thunkMiddleware from "redux-thunk";


const todoListID1 = v1();
const todoListID2 = v1();



const InitialGlobalState = {

    todolists: [
        {id: todoListID1, title: "What to 1", addedDate: "", order: 0, filter: "all", entityStatus: "idle"},
        {id: todoListID2, title: "What to 2", addedDate: "", order: 1, filter: "active", entityStatus: "loading"}
    ],

    tasks:  {
        [todoListID1]: [
            {
                id: v1(),
                status: 1,
                title: "HTML&CSS3",
                description: "",
                todoListId: todoListID1,
                order: 0,
                priority: 0,
                startDate: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: v1(),
                status: 1,
                title: "JS",
                description: "",
                todoListId: todoListID1,
                order: 0,
                priority: 0,
                startDate: "",
                deadline: "",
                addedDate: ""
            },
            {
                id: v1(),
                status: 0,
                title: "React",
                description: "",
                todoListId: todoListID1,
                order: 0,
                priority: 0,
                startDate: "",
                deadline: "",
                addedDate: ""
            },

        ],
        [todoListID2]: [
            {
                id: v1(),
                status: TaskStatuses.New,
                title: "HTML&CSS",
                description: "",
                todoListId: todoListID2,
                order: 0,
                priority: 0,
                startDate: "",
                deadline: "",
                addedDate: ""
            }, {
                id: v1(),
                status: TaskStatuses.New,
                title: "JS",
                description: "",
                todoListId: todoListID2,
                order: 0,
                priority: 0,
                startDate: "",
                deadline: "",
                addedDate: ""
            }, {
                id: v1(),
                status: TaskStatuses.New,
                title: "CSS",
                description: "",
                todoListId: todoListID2,
                order: 0,
                priority: 0,
                startDate: "",
                deadline: "",
                addedDate: ""
            },
        ]
    },

    app: {
        status: 'loading',
        error: "some error"
    }

}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer


})

export const storyBookStore = createStore(rootReducer, InitialGlobalState as AppRootStateType, applyMiddleware(thunkMiddleware))




// export const ReduxStoreProviderDecorator = (storyFn: any) => {
//
//     return <Provider store={storyBookStore}>{storyFn()}</Provider>
//
// }

export const ReduxStoreProviderDecorator = () => {

    return <Provider store={storyBookStore}><App /></Provider>

}