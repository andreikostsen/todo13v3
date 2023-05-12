
import { v1 } from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import { TasksStateType } from '../App';
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: number
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string,
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {


    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {

            return {...state,
            [action.task.todoListId]:[action.task, ...state[action.task.todoListId]]

            };
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            // stateCopy[action.todolistId] = action.tasks
            stateCopy[action.todolistId] = [...action.tasks]
            return stateCopy;
        }

        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;

        }

        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC =  (todolistId: string) =>
    (dispatch: Dispatch) => {
            todolistAPI.getTasks(todolistId)
                .then((res) => {
                    const tasks = res.data.items
                    dispatch(setTasksAC(tasks, todolistId))

                })
}


export const addTasksTC =  (title: string, todolistId: string) =>
    (dispatch: Dispatch) => {
            todolistAPI.createTask(todolistId, title)
                .then((res) => {
                    const task = res.data.data.item
                    dispatch(addTaskAC(task))

                })
}

export const deleteTasksTC =  (taskId: string, todolistId: string) =>
    (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {

                dispatch(removeTaskAC(taskId, todolistId))

            })
    }


    export const changeTaskStatusTC = (taskId: string, status:TaskStatuses, todolistId: string ) =>
        (dispatch: Dispatch, getState: () => AppRootStateType ) => {

    const state = getState()
            const task = state.tasks[todolistId].find(t=>t.id === taskId)

            if (task) {
                const model:UpdateTaskModelType = {
                    title: task.title,
                    description: task.description,
                    status: status,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline
                }

                todolistAPI.updateTask(todolistId, taskId, model)
                    .then(res => {

                        dispatch(changeTaskStatusAC(taskId, status, todolistId))

                    })

            }
        }


export const changeTaskTitleTC = (id: string, newTitle: string, todolistId: string) =>

    (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()

        const task = state.tasks[todolistId].find(t => t.id === id)

        if (task) {

            const model: UpdateTaskModelType = {
                title: newTitle,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            }

            todolistAPI.updateTask(todolistId, id, model)
                .then(res => {

                    dispatch(changeTaskTitleAC(id, newTitle, todolistId))

                })

        }


    }






