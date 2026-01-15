import { createFileRoute, useRouter } from '@tanstack/react-router'
import type { User } from '@/types'
import Users from '@/components/users'
import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/useLogout'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/lib/axios'


export const Route = createFileRoute('/dashboard')({
    ssr: true,
    loader: async () => {
        const response = await api.get('/users')
        const data = response.data.allValidUsers;
        console.log(response)
        const users: Array<User> = data
        return users
    },
    component: RouteComponent,
})



function RouteComponent() {
    const {logout, isPending} = useLogout()
    const router = useRouter()

    return (
        <div>
            <h1>Below are the users of these application</h1>
            <Users />

            <Button disabled={isPending} onClick={() => {
                logout()
            }}>
                {isPending ? <Spinner /> : 'Sign-out'}
            </Button>
        </div>
    )
}
