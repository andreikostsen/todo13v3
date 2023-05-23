import type {Meta, StoryObj} from '@storybook/react';
import App from '../App';
import {action} from '@storybook/addon-actions'
import React from "react";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'TODOLISTS/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
};

export const AppStory = () => {
    return <App />

};
