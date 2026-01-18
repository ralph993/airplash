import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '../routeTree.gen';

const router = createRouter({
  routeTree,
  context: {},
  scrollRestoration: true,
  defaultStructuralSharing: true,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function Provider() {
  return <RouterProvider router={router} />;
}
