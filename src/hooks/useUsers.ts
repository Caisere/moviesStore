import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/lib/getUsers'


export function useUser() {

    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    })

    return { data }
}
