import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import './styles/index.css'
import App from './app/App.jsx'
import { BrowserRouter } from 'react-router';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}> 
        <PrimeReactProvider value={{ ripple: true }}>
          <App />
        </PrimeReactProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)