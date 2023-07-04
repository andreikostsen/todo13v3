import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";

export type FetchLoginErrorActionType = {
    type: 'FETCH-LOGIN-ERROR',
    error: string | null
}
export type AuthorizeActionType = {
    type: 'AUTHORIZE'
}

export type InitialStateType = {
    isAuthorized: boolean,
    loginError: string | null
}

type ActionsType = FetchLoginErrorActionType | AuthorizeActionType

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
            return {...state, isAuthorized: true};
        }
        default:
            return state;
    }
}

export const AuthorizeAC = (): AuthorizeActionType => {
    return {type: 'AUTHORIZE'}
}

export const FetchLoginErrorAC = (error: string):FetchLoginErrorActionType => {
    return {type: 'FETCH-LOGIN-ERROR', error}
}

export const authorizeTC = (email: string, password: string, rememberMe: boolean) =>

    (dispatch: Dispatch) => {

    todolistAPI.authLogin(email, password, rememberMe)
        .then((res) => {

            if (res.data.resultCode === 0) {
                dispatch(AuthorizeAC())
            }

            else   {

                dispatch(FetchLoginErrorAC(res.data.messages[0]))

            }

        })
    }




