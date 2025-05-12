export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: number;
    type: 'text' | 'image' | 'gif' | 'voice';
    read: boolean;
    star?: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture: string;
    lastSeen: number;
}

export interface ChatMode {
    name: string;
    theme: string;
    animation: string;
}

export interface LoveMeter {
    totalMessages: number;
    lastUpdated: number;
}

export interface Countdown {
    targetDate: Date;
    daysLeft: number;
}