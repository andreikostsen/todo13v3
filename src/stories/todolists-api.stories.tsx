import React, {useEffect, useState} from 'react'
import axios from "axios";

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
axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings).then((res) => {
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

        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",
            {title: "MyApps"},
            settings).then((res) => {
            setState(res.data);

        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)


    useEffect(() => {

        const todolistId = "1d77a8ab-7fc7-4116-9661-7807e78793fe"
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings).then(

            (res) => {
                setState(res.data);

            }
        )

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = "bb69c433-99b3-402d-a6d0-8f8e16c05cc2"
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title:"MyGreenApp111"},
            settings).then(

            (res) => {
                setState(res.data);

            }
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

