import { useLoaderData } from "@tanstack/react-router"


function Users () {
    const users = useLoaderData({from: '/dashboard'})
    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <h1 className="text-red-500">{user.name}</h1>
                    <p>{user.id}</p>
                    <p>{user.email}</p>
                    <p>{user.createdAt}</p>
                </div>
            ))}
        </div>
    )
}

export default Users