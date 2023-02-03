import React from "react";
import { Action } from "../enums";

export interface StandardMessage {
    messages?: number;
    timestamp: Date;
    lastMessage?: Record<string, unknown>;
}

export interface ILink {
    text: string | undefined | null;
    url: string | undefined | null;
}

export interface IAction {
    icon?: React.ReactNode | undefined;
    text: string | undefined | null;
    handleAction: () => unknown;
    type?: Action;
    disabled?: boolean;
}

export interface ITableRow {
    [key: string]: string | number | boolean | undefined | null;
}
