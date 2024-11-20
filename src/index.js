import { createRoot } from 'react-dom/client'
import LandingPage from './components/zpages/LandingPage.jsx'
import App from './components/zpages/App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { initializeApp } from 'firebase/app'
import firebaseConfig from './firbaseConfig.js'




const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/app",
    element: <App />,
  }
])

const app = initializeApp(firebaseConfig);


createRoot(document.getElementById('root')).render(
    
        <RouterProvider router={router} />
    
)
