import axios from 'axios'
import type { LoginFormType } from '@/types'




type LoginResponse = {
    success: string,
    data: {
        user: {
            name: string
            email: string
            id: string
        }
    }
}

export async function Login({email, password }: LoginFormType) {
    const response = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_LOCAL_HOST}/auth/login`,
        {
            email,
            password,
        },
    )
    return response
}
