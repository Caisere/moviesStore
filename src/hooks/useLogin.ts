import { useMutation } from '@tanstack/react-query'
import { toast } from "sonner"
import { useNavigate, useRouter } from '@tanstack/react-router'
// import type { AxiosError } from 'axios'
import { Login } from '@/lib/auth/login'

// type ApiError = {
//     message: string,
//     code: string
// }


export function useLogin() {
    const router = useRouter()
    const navigate = useNavigate()

    const { mutate: login, isPending } = useMutation({
        mutationFn: Login,
        onSuccess: () => {
            router.invalidate()
            toast.success('User Login Successfully')
            navigate({ to: '/dashboard' })
        },
        onError: (error) => {
            // const axiosError = error as AxiosError<ApiError>
            // const message = axiosError.response?.data.message || 'something went wrong'
            toast.error(error.message)
        }
    })

    return { login, isPending }
}
