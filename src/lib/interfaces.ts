import { Action } from "./enums";

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
    text: string | undefined | null;
    handleAction: () => unknown;
    type?: Action;
}

export interface ITable {
    [key: string]: string | number | boolean | undefined | null;
}
