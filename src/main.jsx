import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, App as AntApp, message } from 'antd'
import AuthContextProvider from './contexts/AuthContext.jsx'

if (process.env.NODE_ENV === 'development' || VITE_USE_MSW === 'true') {
  const { worker } = await import('./mocks/node.js')
  await worker.start()
}

message.config({
  duration: 2,
  maxCount: 3
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
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
          <AntApp>
            <App />
          </AntApp>
        </ConfigProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
