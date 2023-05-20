
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType,
    error: string | null
}


const initialState: InitialStateType = {
    status: 'idle',
    error: "some error"
}


type ActionsType = setErrorActionType | setStatusActionType

type setStatusActionType = {
    type: "APP/SET-STATUS",
    status: RequestStatusType
}

type setErrorActionType = {
    type: "APP/SET-ERROR",
    error: string | null
}



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


export const setAppStatusAC = (status: RequestStatusType):setStatusActionType => {return {type: "APP/SET-STATUS",  status}}

export const setAppErrorAC = (error: string | null):setErrorActionType => {return {type: "APP/SET-ERROR", error}}


