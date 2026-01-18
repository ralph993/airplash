import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ApolloProvider from './context/ApolloProvider.tsx';
import ClerkProvider from './context/ClerkProvider.tsx';
import RouterProvider from './context/RouterProvider.tsx';
import { ThemeProvider } from './context/ThemeProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider>
      <ApolloProvider>
        <ThemeProvider>
          <RouterProvider />
        </ThemeProvider>
      </ApolloProvider>
    </ClerkProvider>
  </StrictMode>,
);
