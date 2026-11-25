import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { ThemeProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> 
       <ThemeProvider>
         { /* connect redex to react and make the store available for all components */ }
         <App />
       </ThemeProvider>
    </Provider>
  </StrictMode>,
)