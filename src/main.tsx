import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { EnokiFlowProvider } from '@mysten/enoki/react'

import './index.css'
import App from './App.tsx'
import { config } from './config/env.ts'
import { SuiClientProvider } from '@mysten/dapp-kit'
import { networkConfig } from './config/network.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SuiClientProvider networks={networkConfig} defaultNetwork='testnet'>
      <BrowserRouter>
        <EnokiFlowProvider apiKey={config.ENOKI_API_KEY}>
        <App />
        </EnokiFlowProvider>
      </BrowserRouter>
    </SuiClientProvider>
  </StrictMode>,
)
