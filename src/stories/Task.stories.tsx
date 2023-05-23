import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from '../AddItemForm';
import {action} from '@storybook/addon-actions'
import React from "react";
import {Task} from "../Task";
import {TaskType} from "../api/todolist-api";
import {v1} from "uuid";
import {setAppErrorAC} from "../state/app-reducer";


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,

};

export default meta;
type Story = StoryObj<typeof Task>;


const task1 = {
    id: v1(),
    status: 2,
    title: "HTML&CSS3",
    description: "",
    todoListId: "todoListID1",
    order: 0,
    priority: 0,
    startDate: "",
    deadline: "",
    addedDate: ""
}

const task2 = {
    id: v1(),
    status: 0,
    title: "React",
    description: "",
    todoListId: "todoListID2",
    order: 0,
    priority: 0,
    startDate: "",
    deadline: "",
    addedDate: ""
}

const changeTaskStatusCallBack = action("Status changed")
const changeTaskTitleCallBack = action("Title changed")
const removeTaskCallBack = action("Task removed")

const callback = action("task")

export const TaskBaseExample = () => {

    return    <div>

    <Task task={task1}
                 todolistId={"todoListID1"}
                 changeTaskStatus={changeTaskStatusCallBack}
                 changeTaskTitle={changeTaskTitleCallBack}
                 removeTask={removeTaskCallBack}

    />
    <Task task={task2}
                 todolistId={"todoListID2"}
                 changeTaskStatus={changeTaskStatusCallBack}
                 changeTaskTitle={changeTaskTitleCallBack}
                 removeTask={removeTaskCallBack}

    />

    </div>
};
