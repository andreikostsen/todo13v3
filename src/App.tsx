import React, {useCallback, useEffect} from 'react'
import './App.css';
import { Todolist } from './Todolist';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Menu } from '@mui/icons-material';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC, fetchTodolistsTC,
    removeTodolistTC, TodolistDomainType
} from './state/todolists-reducer';
import {

    addTasksTC,
     deleteTasksTC,
    changeTaskStatusTC, changeTaskTitleTC

} from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import {TaskStatuses, TaskType, todolistAPI} from "./api/todolist-api";


export type FilterValuesType = 'all' | 'active' | 'completed';
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }

// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }

export type TasksStateType = {
[todolistId: string]: Array<TaskType>
}


function App() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)


    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch();

useEffect(()=>{

    // @ts-ignore
    dispatch(fetchTodolistsTC())


},[])




    //
    // useEffect(()=>{
    //
    //     // @ts-ignore
    //     dispatch(addTasksTC(title, props.id))
    // },[])

    // useEffect(()=>{
    //
    //     // @ts-ignore
    //     dispatch(deleteTasksTC(props.task.id, props.todolistId))
    // },[])


    const removeTask = useCallback(function (id: string, todolistId: string) {
        // @ts-ignore
        dispatch(deleteTasksTC(id, todolistId))

    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        // @ts-ignore
        dispatch(addTasksTC(title, todolistId))


    }, []);

    const changeTaskStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {

        // @ts-ignore
         dispatch(changeTaskStatusTC(id, status, todolistId))

    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        // @ts-ignore
        dispatch(changeTaskTitleTC(id, newTitle, todolistId))

        // const action = changeTaskTitleAC(id, newTitle, todolistId);
        // dispatch(action);
    }, []);



    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);



    const removeTodolist = useCallback(function (id: string) {

        const thunk = removeTodolistTC(id)
       // @ts-ignore
        dispatch(thunk)

        // const action = removeTodolistAC(id);
        // dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const thunk = changeTodolistTitleTC(id, title);

        // @ts-ignore
        dispatch(thunk);
    }, []);

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title);
        // @ts-ignore
        dispatch(thunk);
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                             // let allTodolistTasks = tasks;

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        // tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
