import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";

import {v1} from "uuid";


const startState: Array<TodolistDomainType>= [
    {id: v1(), title: "What to 1", addedDate: "", order: 0, filter: "all"},
    {id: v1(), title: "What to 2", addedDate: "", order: 1, filter: "active"}
]




const endState = todolistsReducer(startState, addTodolistAC({id: v1(), title: "What to 3", addedDate: "", order: 1}))

test("todolist reducer should add todolist", ()=> {

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("What to 3")

})

const endState1 = todolistsReducer(startState,removeTodolistAC(startState[1].id))

test("todolist reducer should remove todolist", ()=>{

    expect(endState1.length).toBe(1)
    expect(endState1[0].title).toBe("What to 1")
})


const endState2 = todolistsReducer(startState, changeTodolistTitleAC(startState[0].id, "Changed Title"))

test("todolist reducer should change todolist title", ()=>{

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


