import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from '@/components/signup-form'

export const Route = createFileRoute('/signup')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <main className='flex'>
            <section className='flex-1 flex items-center justify-center h-screen'>
                <SignupForm className='w-[50%] mx-auto' />
            </section>
            <section className='flex-1'>
                <h1>Hello "/signup"!</h1>
            </section>
        </main>
    )
}
