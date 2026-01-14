import z from 'zod'

export type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

// Base signup schema (no refinements) so it can be safely reused with .omit()
export const SignupBaseSchema = z.object({
    name: z.string().min(1, 'Full-Name is required'),
    email: z.email(),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(
            /[^A-Za-z0-9]/,
            'Password must contain at least one special character',
        ),
    confirmPassword: z.string(),
})

// Form schema adds the password match refinement on top of the base
export const SignupSchema = SignupBaseSchema.refine(
    (data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    },
)


export type SignupFormType = z.infer<typeof SignupSchema>


export const LoginBaseSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(
            /[^A-Za-z0-9]/,
            'Password must contain at least one special character',
        ),
})

export type LoginFormType = z.infer<typeof LoginBaseSchema>