import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

const initialState:InitialStateType  = {
    status: 'loading',
    error: null
}


test("app should set correct status", ()=> {
    const endState =  appReducer(initialState, setAppStatusAC("idle"))
    expect(endState.status).toBe("idle")
} )

test("app should set correct error", ()=> {
    const endState =  appReducer(initialState, setAppErrorAC("new error"))
    expect(endState.error).toBe("new error")
} )