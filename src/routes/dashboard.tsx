import { createFileRoute } from '@tanstack/react-router'
import type { User } from '@/types'
import Users from '@/components/users'


export const Route = createFileRoute('/dashboard')({
    ssr: true,
    loader: async () => {
        const response = await fetch('http://localhost:3005/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_TOKEN}`, // GENERATED A USER TOKEN FROM THE EXPRESS-API PROJECT FOR TESTING  😋🥰
            }
        })
        const data = await response.json();
        const users: Array<User> = data.allValidUsers
        return users
    },
    component: RouteComponent,
})



function RouteComponent() {
    return (
        <div>
            Below are the users of these application
            <Users />
        </div>
    )
}
