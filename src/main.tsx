import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store';
import { AuthProvider } from './context/AuthContext.tsx'
import { OnlineContext } from './context/OnlineContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <OnlineContext>
            <App />
          </OnlineContext>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
