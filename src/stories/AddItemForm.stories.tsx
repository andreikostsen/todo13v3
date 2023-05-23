import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from '../AddItemForm';
import {action} from '@storybook/addon-actions'
import React from "react";


// More on how to set up stories at:
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs

    // https://storybook.js.org/docs/react/api/argtypes
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

const callback = action("plus button pressed")
// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory = () => {

        return <AddItemForm addItem={callback} />

};
