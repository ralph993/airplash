import { Header } from '@/components/layout/header';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

export const Route = createRootRouteWithContext()({
  component: () => (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="page-transition flex-1">
        <Outlet />
      </main>
    </div>
  ),
});
