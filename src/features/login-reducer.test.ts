import {AuthorizeAC, FetchLoginErrorAC, InitialStateType, loginReducer} from "./login-reducer";


const initialState: InitialStateType = {
    isAuthorized: false,
    loginError: null
}

test("login reducer should fetch correct login error from backend", ()=>{

    const endState = loginReducer(initialState, FetchLoginErrorAC("Incorrect email or password"))

    expect(initialState.loginError).toBe(null)
    expect(endState.loginError).toBe("Incorrect email or password")

})

test("login reducer should set correct isAuthorized status", ()=>{

    const endState = loginReducer(initialState, AuthorizeAC(true))
    expect(initialState.isAuthorized).toBe(false)
    expect(endState.isAuthorized).toBe(true)

})

test("login reducer should set correct isAuthorized status when user logout", ()=>{

    const endState = loginReducer(initialState, AuthorizeAC(false))
    expect(endState.isAuthorized).toBe(false)

})






