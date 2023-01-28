import { User } from "src/db/entities/user.entity";
export interface CreateUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface Success {
    success: boolean;
}

export interface Login {
    user: User;
    success: boolean;
}
