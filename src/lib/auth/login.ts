import { api } from '../axios'
// import type { AxiosError } from 'axios'
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
    try {
        const response = await api.post<LoginResponse>(
            `${import.meta.env.VITE_LOCAL_HOST}/auth/login`,
            {
                email,
                password,
            },
        )
        return response
    } catch (error) {
        // const axiosError = error as AxiosError<{message: string}>
        throw new Error(error as string)
    }
}
