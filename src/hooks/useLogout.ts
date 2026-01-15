import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { Logout } from '@/lib/logout'

export function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const router = useRouter()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      queryClient.clear()
      // Clear the dashboard route's loader cache specifically
      router.clearCache({
        filter: (match) => match.routeId === '/dashboard',
      })
      // Invalidate the dashboard route's loader cache specifically
      router.invalidate({
        filter: (match) => match.routeId === '/dashboard',
      })
      // Also invalidate all other routes
      router.invalidate()
      toast.success('Signed Out Successfully')

      navigate({ to: '/login' })
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  return { logout, isPending }
}
