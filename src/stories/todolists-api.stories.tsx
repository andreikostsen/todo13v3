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

    const [todolistTitle, setTodolistTitle] = useState<string>("")

    const onClickHandler = () => {
        todolistAPI.createTodolist(todolistTitle).then((res) => {
            setState(res.data);

        })
    }


    return <div>{JSON.stringify(state)}

        <input placeholder={"Todolist title"}  onChange={(e)=>setTodolistTitle(e.currentTarget.value)} value={todolistTitle}/>
        <button onClick={onClickHandler}>Create todolist</button>

    </div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const [todolistId, setTodolistId] = useState<string>("")

    const onClickHandler = () => {
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data);

        })
    }


    return <div>{JSON.stringify(state)}

        <input placeholder={"TodolistId"}  onChange={(e)=>setTodolistId(e.currentTarget.value)} value={todolistId}/>
        <button onClick={onClickHandler}>Delete todolist</button>

    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const [todolistTitle, setTodolistTitle] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const onClickHandler = () => {
        todolistAPI.updateTodolist(todolistId, todolistTitle).then((res) => {
            setState(res.data)
        })
    }


    return <div> {JSON.stringify(state)}
        <input placeholder={"TodolistId"}  onChange={(e)=>setTodolistId(e.currentTarget.value)} value={todolistId}/>
        <input placeholder={"New Todolist title"}  onChange={(e)=>setTodolistTitle(e.currentTarget.value)} value={todolistTitle}/>
        <button onClick={onClickHandler}>Update todolist title</button>

    </div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    const [todolistId, setTodolistId] = useState<string>("")


    const onClickHandler = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    //
    // useEffect(()=> {
    //
    //     const todolistId = '0e79168c-be4f-4612-9188-da48db500ce3'
    //
    //     todolistAPI.getTasks(todolistId)
    //         .then((res) => {
    //            setState(res.data)
    //         })
    // },[])

        return <div> {JSON.stringify(state)}

            <input placeholder={"TodolistId"}  onChange={(e)=>setTodolistId(e.currentTarget.value)} value={todolistId}/>

            <button onClick={onClickHandler}>Get task</button>


    </div>

        }


        export const CreateTask = () => {

            const [state, setState] = useState<any>(null)


            const [todolistId, setTodolistId] = useState<string>("")
            const [taskTitle, setTaskTitle] = useState<string>("")


            const onClickHandler = () => {
                todolistAPI.createTask(todolistId, taskTitle).then((res)=>{

                    setState(res.data)

                })
            }



            return <div> {JSON.stringify(state)}
                <input placeholder={"TodolistId"}  onChange={(e)=>setTodolistId(e.currentTarget.value)} value={todolistId}/>
                <input placeholder={"Task title"}  onChange={(e)=>setTaskTitle(e.currentTarget.value)} value={taskTitle}/>
                <button onClick={onClickHandler}>Create task</button>

            </div>


        }

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)


    useEffect(()=> {

        const todolistId = '0e79168c-be4f-4612-9188-da48db500ce3'
        const taskId = "7a7f53b8-369a-4367-affc-374bcab4d5ea"
        const title = "improve react"

        todolistAPI.updateTask(todolistId, taskId, title).then((res)=>{

            setState(res.data)

        })
    },[])

    return <div> {JSON.stringify(state)}</div>


}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)

    const [todolistId, setTodolistId] = useState<string>("")
    const [taskTitle, setTaskTitle] = useState<string>("")


    const onClickHandler = () => {
        todolistAPI.deleteTask(todolistId, taskTitle).then((res)=>{

            setState(res.data)

        })
    }

    //
    // useEffect(()=> {
   //     const todolistId = '0e79168c-be4f-4612-9188-da48db500ce3'
   //     const taskId = 'b98c759f-9f2e-4c07-a73c-e44bca99df0a'
    //     todolistAPI.deleteTask(todolistId, taskId).then((res)=>{
    //
    //         setState(res.data)
    //
    //     })
    // },[])

    return <div> {JSON.stringify(state)}

        <input placeholder={"TodolistId"}  onChange={(e)=>setTodolistId(e.currentTarget.value)} value={todolistId}/>
        <input placeholder={"Task title"}  onChange={(e)=>setTaskTitle(e.currentTarget.value)} value={taskTitle}/>
        <button onClick={onClickHandler}>Delete task</button>

    </div>


}








