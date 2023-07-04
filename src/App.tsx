import React, {useCallback, useEffect, useMemo} from 'react'
import './App.css';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Menu } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import {TaskStatuses, TaskType, todolistAPI} from "./api/todolist-api";
import {LinearProgress} from "@mui/material";
import {ErrorSnackBar} from "./ErrorSnackBar";
import {InitialStateType, RequestStatusType} from "./state/app-reducer";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./features/Login";
import TodolistsList from "./TodolistsList";



export type FilterValuesType = 'all' | 'active' | 'completed';


export type TasksStateType = {
[todolistId: string]: Array<TaskType>
}


function App() {

    const demo = false

    const isAuthorized = useSelector<AppRootStateType, boolean>(state => state.login.isAuthorized)



    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    let loadingStatus = false

    if(status === "loading") {

       loadingStatus = true

    }



    return (
        <div className="App">
            <ErrorSnackBar />
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
                {loadingStatus&&<LinearProgress />}
            </AppBar>
            <Routes>

                    <Route path={'/'} element={isAuthorized?<TodolistsList />:<Login />} />
                    <Route path={'/login'} element={<Login />} />
                <Route path={'/404'} element={<h1>Page not found: 404</h1>} />
                <Route path={'*'} element={<Navigate to ={'/404'} />} />



            </Routes>

        </div>
    );
}

export default App;
