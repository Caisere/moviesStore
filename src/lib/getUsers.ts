import { api } from "./axios";
import type { User } from "@/types";

export async function getUsers () {
    const response = await api.get('/users')
    const data = response.data.allValidUsers;
    console.log(response)
    const users: Array<User> = data
    return users
}