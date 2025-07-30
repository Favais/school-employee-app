import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import AuthContextProvider, { AuthContext } from './contexts/AuthContext.jsx'

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/node.js')
  await worker.start()
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{
        components: {
          Layout: {
            siderBg: '#F9F9F9', // sets Sider background
          },
          Menu: {
            itemBg: '',
            itemSelectedBg: '#000',
            itemSelectedColor: '#fff',
            itemHoverBg: '#B89B3F',




          }
        },
      }}
      >
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ConfigProvider>
    </BrowserRouter>

  </StrictMode>,
)
