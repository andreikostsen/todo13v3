import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";
import {setAppStatusAC} from "../state/app-reducer";

export type FetchLoginErrorActionType = {
    type: 'FETCH-LOGIN-ERROR',
    error: string | null
}
export type AuthorizeActionType = {
    type: 'AUTHORIZE',
    isAuthorized: boolean
}

export type LogOutActionType = {
    type: 'LOG-OUT'
}



export type InitialStateType = {
    isAuthorized: boolean,
    loginError: string | null
}

type ActionsType = FetchLoginErrorActionType | AuthorizeActionType | LogOutActionType

const initialState: InitialStateType = {
    isAuthorized: false,
    loginError: null
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType):InitialStateType => {

    switch (action.type) {
        case 'FETCH-LOGIN-ERROR': {
            return {...state, loginError: action.error};
        }
        case 'AUTHORIZE': {
            return {...state, isAuthorized: action.isAuthorized};
        }

        default:
            return state;
    }
}

export const AuthorizeAC = (isAuthorized: boolean): AuthorizeActionType => {
    return {type: 'AUTHORIZE', isAuthorized}
}

export const FetchLoginErrorAC = (error: string | null):FetchLoginErrorActionType => {
    return {type: 'FETCH-LOGIN-ERROR', error}
}

export const LogOutAC = ():LogOutActionType => {
    return {type: 'LOG-OUT'}
}

export const authorizeTC = (email: string, password: string, rememberMe: boolean) =>

    (dispatch: Dispatch) => {

        dispatch(setAppStatusAC("loading"))

    todolistAPI.authLogin(email, password, rememberMe)
        .then((res) => {
            dispatch(setAppStatusAC("idle"))

            if (res.data.resultCode === 0) {
                dispatch(AuthorizeAC(true))
            }

            else   {

                dispatch(FetchLoginErrorAC(res.data.messages[0]))

            }

        })
    }


export const CheckIfUserAuthorizedTC = () =>

    (dispatch: Dispatch) => {


    todolistAPI.authMe()
        .then((res) => {

            if (res.data.resultCode === 0) {
                dispatch(AuthorizeAC(true))

            }

            // else   {
            //
            //     dispatch(FetchLoginErrorAC(res.data.messages[0]))
            //
            // }

        })
    }

export const LogOutTC = () =>

    (dispatch: Dispatch) => {


    todolistAPI.authLogOut()
        .then((res) => {

            if (res.data.resultCode === 0) {
                dispatch(AuthorizeAC(false))
                dispatch(FetchLoginErrorAC(null))
            }

            else {

                dispatch(FetchLoginErrorAC(null))

            }

        })
    }






