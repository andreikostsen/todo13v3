import axios from 'axios'
import {TodolistDomainType} from "../state/todolists-reducer";

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}


type TodolistResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D

}

export type TaskType = {
        id: string,
        title: string,
        description: string,
        todoListId: string,
        order: number,
        status: TaskStatuses,
        priority: TaskPriorities,
        startDate: string,
        deadline: string,
        addedDate: string
    }

export type UpdateTaskModelType = {
    title: string,
    description: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,



}

export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}


    type TaskResponseType<D = {}> = {
        data: D,
        messages: Array<string>,
        fieldsErrors: Array<string>,
        resultCode: number

    }

type GetTasksResponseType = {

    items: Array<TaskType>,
    totalCount: number,
    error: string | null

}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}




const instance = axios.create(
    {
        baseURL: `https://social-network.samuraijs.com/api/1.1/`,
        withCredentials: true,
        headers: {
            'API-KEY': 'ef64ab43-3fa1-4fd0-9e2b-61a258b28cf8'
        },

    })


export const todolistAPI = {

    getTodolist() {
        const promise = instance.get<Array<TodolistType>>(
            `todo-lists`
        )
        return promise
    },

    createTodolist(title: string) {

        const promise = instance.post<TodolistResponseType<{item: TodolistType}>>(
            `todo-lists`,
            { title: title },

        )
        return promise
    },

    deleteTodolist(todolistId: string) {
        const promise = instance.delete<TodolistResponseType>(
            `todo-lists/${todolistId}`,

        )
        return promise
    },

    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<TodolistResponseType>(
            `todo-lists/${todolistId}`,
            {title: title},

        )
        return promise
    },

    getTasks(todolistId: string) {
        const promise = instance.get<GetTasksResponseType>(
            `/todo-lists/${todolistId}/tasks`,
        )
        return promise

    },



    createTask(todolistId: string, title: string) {

        const promise = instance.post<TaskResponseType<{item: TaskType}>>(
            `/todo-lists/${todolistId}/tasks`,
            {title: title},
        )
        return promise
    },


    updateTask (todolistId: string, taskId: string, model: UpdateTaskModelType) {

        const promise = instance.put<TaskResponseType<{item: TaskType}>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            model,
        )

        return promise


    },


    deleteTask(todolistId: string, taskId: string) {

        const promise = instance.delete<TaskResponseType>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
        )

        return promise

    },
}