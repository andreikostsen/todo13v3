import axios from 'axios'
import {TodolistDomainType} from "../state/todolists-reducer";

type TodolistType = {
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

type TaskType = {
        id: string,
        title: string,
        description: string,
        todoListId: string,
        order: number,
        status: number,
        priority: number,
        startDate: string,
        deadline: string,
        addedDate: string
    }

    type TaskResponseType<D = {}> = {
        data: D,
        messages: Array<string>,
        fieldsErrors: Array<string>,
        resultCode: number

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
        const promise = instance.get<Array<TodolistDomainType>>(
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
        const promise = instance.get<Array<TaskType>>(
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


    updateTask(todolistId: string, taskId: string, title: string) {

        const promise = instance.put<TaskResponseType<{item: TaskType}>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            {title: title},
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