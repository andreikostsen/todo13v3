import React from "react";


import {ErrorSnackBar} from "../ErrorSnackBar";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'TODOLISTS/ErrorSnackBar',
    component: ErrorSnackBar,
    decorators: [ReduxStoreProviderDecorator]

};

export const ErrorSnackBarBaseExample = () => {
    return <ErrorSnackBar />

};
