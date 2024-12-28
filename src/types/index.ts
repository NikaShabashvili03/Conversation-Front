
export interface SafeUser {
    id: number
    avatar: string | null
    email: string
    isOnline: boolean
    firstname: string
    lastname: string
}

export interface SafeConversation {
    id: number
    name: string | null
    isGroup: boolean
    users: SafeUser[] | []
    lastMessage: SafeMessage | null
    created_at: Date
    updated_at: Date
}


export interface SafeMessage {
    id: number
    sender: SafeUser
    body: string
    images: SafeMessageImage[] | []
    reactions: SafeMessageReaction[] | []
    seens: SafeUser[] | []
    isDeleted: Date
    isEdited: Date
    isReacted: boolean
    created_at: Date
    updated_at: Date
}

export interface SafeMessageImage {
    url: string
}

export interface SafeMessageReaction {
    user: SafeUser
    emoji: string
    created_at: Date
}

export type Emoji = "❤️" | "👍" | "😂" | "😮" | "😢" | "👎"