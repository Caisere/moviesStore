import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '@/components/header'
import Footer from '@/components/footer'



export const Route = createRootRoute({
  component: () => (
    <div className='relative'>
      <Header />
      <main className='min-h-screen max-w-8xl w-[95%] mx-auto'>
        <Outlet />
      </main>
      <Footer/>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  ),
  notFoundComponent: () => <h1 className='mt-20'>(404) Page Not Found</h1>
})
