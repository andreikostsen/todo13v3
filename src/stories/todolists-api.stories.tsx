import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react'
import {TaskPriorities, TaskStatuses, todolistAPI, UpdateTaskModelType} from '../api/todolist-api';
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {AddBox} from "@mui/icons-material";
import {AddItemFormPropsType} from "../AddItemForm";

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

        const model:UpdateTaskModelType = {
            title: "improve react",
            description: "",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            startDate: '',
            deadline: ''
        }


        const todolistId = 'f0bf3f88-71a7-43d2-9d0b-3b1fbe2727e1'
        const taskId = "bdf92781-77ed-4df5-9777-bb92315766b5"


        todolistAPI.updateTask(todolistId, taskId, model).then((res)=>{

            setState(res.data.data.item)

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



    return <div> {JSON.stringify(state)}

        <input placeholder={"TodolistId"}  onChange={(e)=>setTodolistId(e.currentTarget.value)} value={todolistId}/>
        <input placeholder={"Task title"}  onChange={(e)=>setTaskTitle(e.currentTarget.value)} value={taskTitle}/>
        <button onClick={onClickHandler}>Delete task</button>

    </div>


}








