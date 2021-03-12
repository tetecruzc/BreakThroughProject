import { User } from "@/modules/users/interfaces/users.interface";
import { Route } from "@/modules/routes/interfaces/routes.interface";

export interface UsersStateInterface {
    users: User[];
    totalUsers: number;
    routes: Route[],
    activitiesRoutes: Route,
    activitiesSubRoutes: Route
}
