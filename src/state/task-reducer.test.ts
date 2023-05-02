
import {FilterValuesType, TasksStateType} from "../App";
import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, setTodolistsAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TodolistType} from "../api/todolist-api";



const todoListID1 = v1();
const todoListID2 = v1();

const state: TasksStateType = {
    [todoListID1]: [
        {
            id: v1(),
            status: 1,
            title: "HTML&CSS",
            description: "",
            todoListId: todoListID1,
            order: 0,
            priority: 0,
            startDate: "",
            deadline: "",
            addedDate: ""
        },
        {
            id: v1(),
            status: 1,
            title: "JS",
            description: "",
            todoListId: todoListID1,
            order: 0,
            priority: 0,
            startDate: "",
            deadline: "",
            addedDate: ""
        },
        {
            id: v1(),
            status: 0,
            title: "React",
            description: "",
            todoListId: todoListID1,
            order: 0,
            priority: 0,
            startDate: "",
            deadline: "",
            addedDate: ""
        },

    ],
    [todoListID2]: [
        {
            id: v1(),
            status: 1,
            title: "HTML&CSS",
            description: "",
            todoListId: todoListID2,
            order: 0,
            priority: 0,
            startDate: "",
            deadline: "",
            addedDate: ""
        }, {
            id: v1(),
            status: 1,
            title: "JS",
            description: "",
            todoListId: todoListID2,
            order: 0,
            priority: 0,
            startDate: "",
            deadline: "",
            addedDate: ""
        }, {
            id: v1(),
            status: 0,
            title: "CSS",
            description: "",
            todoListId: todoListID2,
            order: 0,
            priority: 0,
            startDate: "",
            deadline: "",
            addedDate: ""
        },
    ]
}



let endState =tasksReducer(state, addTaskAC("Redux", todoListID1) )

test("task reducer should add new task", ()=>{

    expect(endState[todoListID1].length).toBe(4)
    expect(endState[todoListID1][0].title).toBe("Redux")


})


let endState1 =tasksReducer(state, removeTaskAC(state[todoListID2][0].id, todoListID2) )

test("task reducer should remove task", ()=>{

    expect(endState1[todoListID2].length).toBe(2)



})


let endState2 = tasksReducer(state, changeTaskTitleAC(state[todoListID2][0].id, "HTML&CSS&SASS", todoListID2 ) )

test("task reducer should change task title", ()=>{

    expect(endState2[todoListID2][0].title).toBe("HTML&CSS&SASS")

})

let endState3 = tasksReducer(state, changeTaskStatusAC(state[todoListID2][2].id, state[todoListID2][2].status,todoListID2))

test("task reducer should change task status", ()=>{

    expect(endState3[todoListID2][2].status).toBe(1)

})


test("empty tasks array should be added when we add new todolist", ()=>{

    const startState: Array<TodolistDomainType>= [
        {id: v1(), title: "What to 1", addedDate: "", order: 0, filter: "all"},
        {id: v1(), title: "What to 2", addedDate: "", order: 1,  filter: "all"}
    ]


    let action = addTodolistAC("What to drink")

    let todolistsEndState = todolistsReducer(startState, action)
    let tasksEndState = tasksReducer({}, action)

expect(todolistsEndState.length).toBe(3)
    expect(tasksEndState[todolistsEndState[0].id]).toStrictEqual([])
    expect(todolistsEndState[1].title).toBe("What to 1")

})


test("empty task arrays should be created when we set todolists", ()=>{

    const startState: Array<TodolistType>= [
        {id: v1(), title: "What to 1", addedDate: "", order: 0},
        {id: v1(), title: "What to 2", addedDate: "", order: 1}
    ]

    let tasksEndState = tasksReducer({}, setTodolistsAC(startState))

    const keys = Object.keys(tasksEndState)

    expect(tasksEndState[startState[0].id]).toStrictEqual([])
    expect(tasksEndState[startState[1].id]).toStrictEqual([])
    expect(keys.length).toBe(2)

})

test("correct tasks should be setted", ()=>{

    let tasksEnsState = tasksReducer({}, setTasksAC(state[todoListID1], todoListID1))

    expect(tasksEnsState[todoListID1].length).toBe(3)
    expect(tasksEnsState[todoListID1][0].title).toEqual("HTML&CSS")

})