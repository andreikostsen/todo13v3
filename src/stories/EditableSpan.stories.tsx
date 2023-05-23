import type {Meta, StoryObj} from '@storybook/react';
import {EditableSpan} from '../EditableSpan';
import {action} from '@storybook/addon-actions'
import React from "react";



const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,

};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

const onChangeCallback = action("editable span is pressed")
// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const EditableSpanStory = () => {

        return <EditableSpan value={"asdasd"} onChange={onChangeCallback}/>

};
