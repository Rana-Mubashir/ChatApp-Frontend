import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import EmailConfirmation from './pages/EmailConfirmation.jsx'
import StripePayment from './pages/stripe/Index.jsx'
import Cancel from './pages/stripe/components/Cancel.jsx'
import Success from './pages/stripe/components/Success.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from './pages/ResetPassword.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/home' element={<LandingPage />} />
      <Route path='/emailConfirm/:userId' element={<EmailConfirmation />} />
      <Route path='/checkout' element={<StripePayment />} />
      <Route path='/success' element={<Success />} />
      <Route path='/cancel' element={<Cancel />} />
      <Route path='/resetpassword/:userid' element={<ResetPassword />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
