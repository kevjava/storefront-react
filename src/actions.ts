import {Action} from "@reduxjs/toolkit";

export default interface IAction<T> extends Action<string> {
    type: string;
    payload?: T;
}

