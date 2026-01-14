import { useMutation } from '@tanstack/react-query'
import { toast } from "sonner"
import { useNavigate } from '@tanstack/react-router'
import { Login } from '@/lib/login'


export function useLogin() {

    const navigate = useNavigate()

    const { mutate: login, isPending } = useMutation({
        mutationFn: Login,
        onSuccess: () => {
            toast.success('User Login Successfully')
            navigate({ to: '/dashboard' })
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { login, isPending }
}
