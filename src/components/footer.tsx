export default function Footer () {
    return (
        <footer className="py-8 border-t border-border bg-black">
            <div className="container mx-auto px-4 text-center text-muted-foreground">
                <p>© {new Date().getFullYear()} CineVault. Built for movie lovers.</p>
            </div>
        </footer>   
    )
}