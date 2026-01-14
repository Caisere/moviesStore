import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Spinner } from "./ui/spinner"
import type { LoginFormType } from '@/types'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LoginBaseSchema} from "@/types"
import { useLogin } from "@/hooks/useLogin"



export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<LoginFormType>({
        resolver: zodResolver(LoginBaseSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const {login, isPending} = useLogin()

    function handleLogin(data:LoginFormType) {
        console.log(data)
        login(data)
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(handleLogin)}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                        Enter your email below to login to your account
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input id="email" type="email" placeholder="m@example.com" {...register('email')}  />
                    {errors.email && (
                        <FieldDescription className="text-red-400">
                            {errors.email.message}
                        </FieldDescription>
                    )}
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <div className="relative">
                        <Input id="password" type={showPassword ? 'text' : 'password'} {...register('password')}/>
                        <Button
                            onClick={() => setShowPassword((is) => !is)}
                            type="button"
                            className="absolute top-0 right-0"
                        >
                            {showPassword ? <Eye /> : <EyeOff />}
                        </Button>
                        {errors.password && (
                        <FieldDescription className="text-red-400">
                            {errors.password.message}
                        </FieldDescription>
                    )}
                    </div>
                </Field>
                <Field className="">
                    <Button className="cursor-pointer" type="submit" disabled={isSubmitting || isPending}>{isSubmitting || isPending ? <Spinner /> : 'Login'}</Button>
                </Field>
                <Field className="">
                    <span>Don&apos;t have an account?{" "}</span>
                    <Link to="/signup" className="underline underline-offset-4">
                        Sign up
                    </Link>
                </Field>
            </FieldGroup>
        </form>
    )
}
