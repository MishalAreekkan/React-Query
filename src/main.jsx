import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import App from './App.jsx';
import './main.css'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <App />
    </QueryClientProvider>
);
