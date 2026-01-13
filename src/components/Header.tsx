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
        to: '/browsejobs',
        label: 'Browse Jobs'
    },
    {
        to: '/login',
        label: 'Login'
    }
]


export default function Header() {
    return (
        <>
            <header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
                {navigationLinks.map(link => (
                    <div className="" key={link.label}>
                        <Link to={link.to}>{link.label}</Link>
                    </div>
                ))}
            </header>
        </>
    )
}
