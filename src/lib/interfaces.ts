export interface StandardMessage {
    messages?: number;
    timestamp: Date;
    lastMessage?: Record<string, unknown>;
}

export interface ILink {
    text: string | undefined | null;
    url: string | undefined | null;
}
