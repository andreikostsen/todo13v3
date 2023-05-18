
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: "some error"
}


type ActionsType = setErrorActionType | setStatusActionType

type setStatusActionType = {
    type: "APP/SET-STATUS",
    status: RequestStatusType
}

type setErrorActionType = {
    type: "APP/SET-ERROR",
    error: string
}



export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setErrorAC = (error: string):setErrorActionType => {return {type: "APP/SET-ERROR", error}}


