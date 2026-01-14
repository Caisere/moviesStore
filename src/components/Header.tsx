import { Link } from "@tanstack/react-router"

type NavigationLinks = {
    to: string
    label: string
}


const navigationLinks: Array<NavigationLinks> = [
    {
        to: '/',
        label: 'Home'
    },
    {
        to: '/movies',
        label: 'Movies'
    },
    {
        to: '/login',
        label: 'Login'
    }
]


export default function Header() {
    return (
        <>
            <header className="p-4 flex items-center bg-primary text-white shadow-lg fixed top-0 inset-x-0 z-10">
                {navigationLinks.map(link => (
                    <div className="" key={link.label}>
                        <Link to={link.to}>{link.label}</Link>
                    </div>
                ))}
            </header>
        </>
    )
}
