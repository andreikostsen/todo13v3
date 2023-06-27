import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import {addTaskAC} from "../state/tasks-reducer";
import {AxiosResponse} from "axios";


export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {

    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC("failed"))
}

export const handleServerAppError = (res: AxiosResponse, dispatch: Dispatch) => {

    if (res.data.resultCode == 0) {
        const task = res.data.data.item
        dispatch(addTaskAC(task))
        dispatch(setAppStatusAC("succeeded"))
    } else {

        dispatch(setAppErrorAC(res.data.messages[0]))
        dispatch(setAppStatusAC("failed"))
    }
}

