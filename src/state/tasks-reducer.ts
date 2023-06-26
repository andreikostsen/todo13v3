
import { v1 } from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import { TasksStateType } from '../App';
import {Dispatch} from "redux";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    UpdateDomainTaskModelType,
    UpdateTaskModelType
} from "../api/todolist-api";
import {AppRootStateType} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: number
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type UpdateTaskActionType = {
    type: "UPDATE-TASK",
    todolistId: string,
    taskId: string,
    model: TaskType
}

export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string,
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType
    | UpdateTaskActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {


    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {

            return {...state,
            [action.task.todoListId]:[action.task, ...state[action.task.todoListId]]

            };
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            // stateCopy[action.todolistId] = action.tasks
            stateCopy[action.todolistId] = [...action.tasks]
            return stateCopy;
        }

        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case "UPDATE-TASK": {

            //
            // let stateCopy = {...state}
            //
            //
            // const updatedTasks = stateCopy[action.todolistId].map(t=>t.id===action.taskId?action.model:t)
            //
            // stateCopy[action.todolistId]=updatedTasks
            //
            // return stateCopy


            return {...state,
               [action.todolistId]:state[action.todolistId].map(t=>t.id===action.taskId?action.model:t)
           }


        }


        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;

        }

        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const UpdateTaskAC = (todolistId: string, taskId: string, model: TaskType): UpdateTaskActionType => {
    return {type: "UPDATE-TASK", todolistId, taskId, model}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC =  (todolistId: string) =>


    (dispatch: Dispatch) => {

        dispatch(setAppStatusAC('loading'))

            todolistAPI.getTasks(todolistId)
                .then((res) => {
                    const tasks = res.data.items
                    dispatch(setTasksAC(tasks, todolistId))
                    dispatch(setAppStatusAC('succeeded'))

                })
}


export const addTasksTC =  (title: string, todolistId: string) =>
    (dispatch: Dispatch) => {

    dispatch(setAppStatusAC("loading"))

            todolistAPI.createTask(todolistId, title)
                .then((res) => {

                    if(res.data.resultCode == 0) {
                        const task = res.data.data.item
                        dispatch(addTaskAC(task))
                        dispatch(setAppStatusAC("succeeded"))
                    } else {

                        dispatch(setAppErrorAC(res.data.messages[0]))
                        dispatch(setAppStatusAC("failed"))
                    }


                })
}

export const deleteTasksTC =  (taskId: string, todolistId: string) =>
    (dispatch: Dispatch) => {

        dispatch(setAppStatusAC('loading'))

        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {

                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }


    export const updateTaskTC = (id: string, updateTaskModel: UpdateDomainTaskModelType, todolistId: string) =>

      (dispatch: Dispatch, getState: () => AppRootStateType) => {



    const state = getState()

          const task = state.tasks[todolistId].find(t=>t.id===id)

          dispatch(setAppStatusAC('loading'))

          if (task) {

              const model: TaskType = {
                  id: task.id,
                  todoListId: task.todoListId,
                  order: task.order,
                  addedDate: task.addedDate,
                  title: task.title,
                  description: task.description,
                  status: task.status,
                  priority: task.priority,
                  startDate: task.startDate,
                  deadline: task.deadline,

                  ...updateTaskModel
              }

              todolistAPI.updateTask(todolistId,id, model)
                  .then((res) => {

                      dispatch(UpdateTaskAC(todolistId,id, model))
                      dispatch(setAppStatusAC('succeeded'))


                  } )

          }
        }








