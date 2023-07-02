import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";

export type CheckIfAuthorizedActionType = {
    type: 'CHECK-IF-AUTHORIZED',
}
export type AuthorizeActionType = {
    type: 'AUTHORIZE'
}

type InitialStateType = {
    isAuthorized: boolean
}

type ActionsType = CheckIfAuthorizedActionType | AuthorizeActionType

const initialState: InitialStateType = {
    isAuthorized: false
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType):InitialStateType => {

    switch (action.type) {
        case 'CHECK-IF-AUTHORIZED': {
            return state;
        }
        case 'AUTHORIZE': {

            return {...state, isAuthorized: true};
        }
        default:
            return state;
    }
}

export const AuthorizeAC = (): AuthorizeActionType => {
    return {type: 'AUTHORIZE'}
}

export const authorizeTC = (email: string, password: string, rememberMe: boolean) =>

    (dispatch: Dispatch) => {

    todolistAPI.authLogin(email, password, rememberMe)
        .then((res) => {

            if (res.data.resultCode === 0) {
                dispatch(AuthorizeAC())
            }

            // else if (res.data.resultCode === 1) {
            //
            //     dispatch(AuthorizeAC())
            //
            // }

        })
    }



// export const addTasksTC = (title: string, todolistId: string) =>
//     (dispatch: Dispatch) => {
//
//         dispatch(setAppStatusAC("loading"))
//
//         todolistAPI.createTask(todolistId, title)
//             .then((res) => {
//
//                 if (res.data.resultCode == 0) {
//                     const task = res.data.data.item
//                     dispatch(addTaskAC(task))
//                     dispatch(setAppStatusAC("succeeded"))
//                 } else {
//
//                     if (res.data.messages.length) {
//                         handleServerAppError(res, dispatch);
//                         // dispatch(setAppErrorAC(res.data.messages[0]))
//                         // dispatch(setAppStatusAC("failed"))
//
//                     }
//
//                 }
//
//
//             })
//             .catch((error) => {
//                 handleServerNetworkError(error, dispatch);
//                 }
//             )
//     }









