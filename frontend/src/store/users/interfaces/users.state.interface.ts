import { User } from "@/modules/users/interfaces/users.interface";

export interface UsersStateInterface {
    users: User[];
    totalUsers: number;
}
