import React, {useEffect, useState} from 'react'
import axios from "axios";
import { todolistAPI } from '../api/todolist-api';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'ef64ab43-3fa1-4fd0-9e2b-61a258b28cf8'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
todolistAPI.getTodolist().then((res) => {
    setState(res.data);

})
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        todolistAPI.createTodolist("I am new todolist").then((res) => {
            setState(res.data);

        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
            const todolistId = '91d8c754-dbc6-4454-aa16-478da0199049'
            todolistAPI.deleteTodolist(todolistId).then((res) => {

                setState(res.data)

            })
        }

    , [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bb69c433-99b3-402d-a6d0-8f8e16c05cc2'
        todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

