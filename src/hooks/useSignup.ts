import { useMutation } from '@tanstack/react-query'
import { toast } from "sonner"
import { useNavigate } from '@tanstack/react-router'
import { SignUp } from '@/lib/auth/signup'



export function useSignUp() {

    const navigate = useNavigate()

    const { mutate: signUp, isPending } = useMutation({
        mutationFn: SignUp,
        onSuccess: () => {
            toast.success('User Created Successfully, Process to Login Page')
            navigate({ to: '/login' })
            // localStorage.setItem('token', data.data.data.token)
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    return { signUp, isPending }
}
