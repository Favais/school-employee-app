import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'

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
        <App />
      </ConfigProvider>
    </BrowserRouter>

  </StrictMode>,
)
