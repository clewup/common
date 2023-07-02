export interface UserType {
    id: string
    name?: string
    email: string
    emailVerified?: string
    image?: string
    role: 'User' | 'Admin'
    createdAt: string
    updatedAt: string
}
