import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";

import {v1} from "uuid";


const startState: Array<TodolistDomainType>= [
    {id: v1(), title: "What to 1", addedDate: "", order: 0, filter: "all", entityStatus: "idle"},
    {id: v1(), title: "What to 2", addedDate: "", order: 1, filter: "active", entityStatus: "idle"}
]




test("todolist reducer should add todolist", ()=> {

    const endState = todolistsReducer(startState, addTodolistAC({id: v1(), title: "What to 3", addedDate: "", order: 1}))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("What to 3")

})


test("todolist reducer should remove todolist", ()=>{
    const endState1 = todolistsReducer(startState,removeTodolistAC(startState[1].id))

    expect(endState1.length).toBe(1)
    expect(endState1[0].title).toBe("What to 1")
})




test("todolist reducer should change todolist title", ()=>{
    const endState2 = todolistsReducer(startState, changeTodolistTitleAC(startState[0].id, "Changed Title"))
    expect(endState2[0].title).toBe("Changed Title")


})

//
//
// test("todolist reducer should change todolist filter", ()=>{
//     let endState3 = todolistsReducer(startState, changeTodolistFilterAC(startState[1].id, "all"))
//     expect(endState3[1].filter).toBe("all")
//     expect(endState3[0].filter).toBe("all")
// })

test("initial todolists should be setted", ()=>{

    let endState = todolistsReducer([], setTodolistsAC(startState))

    expect(endState.length).toBe(2)

})


