export interface UserType {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    role: 'User' | 'Admin';
    createdAt: Date;
    updatedAt: Date;
}
