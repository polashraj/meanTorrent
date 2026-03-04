// TypeScript interfaces for User, Torrent, Forum, and Announce event types

// Interface for User
export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

// Interface for Torrent
export interface Torrent {
    id: string;
    name: string;
    size: number;
    seeders: number;
    leechers: number;
    uploadedAt: string;
    userId: string;
}

// Interface for Forum
export interface Forum {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    userId: string;
}

// Interface for Announce event
export interface AnnounceEvent {
    eventType: "started" | "stopped" | "completed";
    torrentId: string;
    userId: string;
    timestamp: string;
}