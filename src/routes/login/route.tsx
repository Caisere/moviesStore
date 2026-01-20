import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/login-form'

export const Route = createFileRoute('/login')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className='flex h-screen'>
            <section className='flex-1 mt-20'>
                <h1>Hello Login</h1>
            </section>
            <section className='flex-1 flex justify-center items-center h-full'>
                <LoginForm className='w-[60%] mx-auto'/>
            </section>
        </main>
    )
}
