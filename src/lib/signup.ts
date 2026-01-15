import axios from 'axios'
import { api } from './axios'
import type z from 'zod'
import { SignupBaseSchema } from '@/types'

// Schema for the API payload (no confirmPassword)
const SignUpSchema = SignupBaseSchema.omit({ confirmPassword: true })

type SignupType = z.infer<typeof SignUpSchema>

type SignupResponse = {
    data: {
        user: {
            name: string
            email: string
        }
    }
}

export async function SignUp({ name, email, password }: SignupType) {
    const response = await api.post<SignupResponse>(
        `${import.meta.env.VITE_LOCAL_HOST}/auth/register`,
        {
            name,
            email,
            password,
        },
    )
    return response
}
