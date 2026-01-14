import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import { Eye, EyeOff } from 'lucide-react'
import { Spinner } from './ui/spinner'
import type { SignupFormType } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useSignUp } from '@/hooks/useSignup'
import { SignupSchema } from '@/types'

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<'form'>) {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [confirmPassword, setConfirmPassword] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<SignupFormType>({
            defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: zodResolver(SignupSchema),
    })
    const {signUp, isPending } = useSignUp()

    function handleUserSignup(data: SignupFormType) {
        // console.log(data)
        signUp(data)
        reset()
    }

    return (
        <form
        className={cn('flex', className)}
        {...props}
        onSubmit={handleSubmit(handleUserSignup)}
        >
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Fill in the form below to create your account
                    </p>
                    </div>
                <Field>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        {...register('name')}
                    />
                    {errors.name && (
                        <FieldDescription className="text-red-400">
                            {errors.name.message}
                        </FieldDescription>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register('email')}
                    />
                    <FieldDescription>
                        We&apos;ll use this to contact you. We will not share your email
                        with anyone else.
                    </FieldDescription>
                    {errors.email && (
                        <FieldDescription className="text-red-400">
                            {errors.email.message}
                        </FieldDescription>
                    )}
                    </Field>
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                        />
                        <Button
                            onClick={() => setShowPassword((is) => !is)}
                            type="button"
                            className="absolute top-0 right-0"
                        >
                            {showPassword ? <Eye /> : <EyeOff />}
                        </Button>
                    </div>
                    {errors.password && (
                        <FieldDescription className="text-red-400">
                            {errors.password.message}
                        </FieldDescription>
                    )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={confirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword')}
                        />
                        <Button
                            onClick={() => setConfirmPassword((is) => !is)}
                            type="button"
                            className="absolute top-0 right-0"
                        >
                            {confirmPassword ? <Eye /> : <EyeOff />}
                        </Button>
                    </div>
                    {errors.confirmPassword && (
                        <FieldDescription className="text-red-400">
                            {errors.confirmPassword.message}
                        </FieldDescription>
                    )}
                </Field>
                <Field>
                    <Button
                        type="submit"
                        className="cursor-pointer"
                        disabled={isSubmitting || isPending}
                    >
                        {isSubmitting || isPending ? <Spinner /> : 'Create Account'}
                    </Button>
                </Field>
                <Field>
                    <FieldDescription className="px-6 text-center">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </FieldDescription>
                </Field>
            </FieldGroup>
        </form>
    )
}
