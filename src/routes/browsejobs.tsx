import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/browsejobs')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/browse-job"!</div>
}
