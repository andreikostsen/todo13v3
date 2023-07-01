
export type CheckIfAuthorizedActionType = {
    type: 'CHECK-IF-AUTHORIZED',
}
export type AuthorizeActionType = {
    type: 'AUTHORIZE',
    email: string,
    password: string,
    rememberMe: boolean,
}

type InitialStateType = {
    isAuthorized: boolean
}


type ActionsType = CheckIfAuthorizedActionType | AuthorizeActionType

const initialState: InitialStateType = {
    isAuthorized: false
}




export const loginReducer = (state: InitialStateType = initialState, action: ActionsType) => {


    switch (action.type) {
        case 'CHECK-IF-AUTHORIZED': {

            return state;
        }
        case 'AUTHORIZE': {

            return state;
        }

        default:
            return state;
    }
}
//
// export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
//     return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
// }
//
//
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









