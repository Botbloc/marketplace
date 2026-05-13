export type FirestoreTimestamp = {
    _seconds: number
    _nanoseconds: number
}

export type User_type = {
    uid: string
    username?: string
    email: string
    email_verified?: boolean
    role: string
    createdAt?: string | FirestoreTimestamp
    verifiedAt?: string | FirestoreTimestamp
    auth_time?: number
}
