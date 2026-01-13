import { createFileRoute } from '@tanstack/react-router'
import type { User } from '@/types'
import Users from '@/components/users'


const yourToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyMjRhZTJmLWZjODEtNDc3NC1iYTRkLTExZmQzYzBjM2RjMCIsImlhdCI6MTc2ODMxNjY0NiwiZXhwIjoxNzY4OTIxNDQ2fQ.5wMuPXj75-zeCniPImifV2__ZuWp8I1I2ErIozQaaKA'

export const Route = createFileRoute('/dashboard')({
    ssr: true,
    loader: async () => {
        const response = await fetch('http://localhost:3005/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${yourToken}`,
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
