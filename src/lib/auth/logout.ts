import { api } from "../axios";


export async function Logout() {
    await api.post(`${import.meta.env.VITE_LOCAL_HOST}/auth/logout`)
}
