import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import {AuthLayout} from "./components/index.js"
import './index.css'
import App from './App.jsx'
import {Home} from './components/index.js'
import {Login} from './components/index.js'
import {Signup} from './components/index.js'
import Jobs from './components/Jobs.jsx'
import MyMessages from './components/MyMessages.jsx'
import PostJobs from './components/PostJobs.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: (
                    <Home/>
                    ),
        },
        {
            path: "/login",
            element: <Login />,
            loader: () => {console.log('Login route matched');
                            return null;
            }
                // <AuthLayout authentication={false}>
                //     <Login />
                // </AuthLayout>

            
        },
        {
            path: "/signup",
            element: (
                // <AuthLayout authentication={false}>
                //     <Signup />
                // </AuthLayout>
                    <Signup />
            ),
        },
        {
          path: "/jobs",
          element: (
              // <AuthLayout authentication={false}>
              //     <Signup />
              // </AuthLayout>
                  <Jobs />
          ),
      },
      {
        path: "/messages",
        element: (
            // <AuthLayout authentication={false}>
            //     <Signup />
            // </AuthLayout>
                <MyMessages />
        ),
    },
    {
        path: "/addJob/:jobId",
        element: (<PostJobs/>),
    },
        
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <NextUIProvider>
     <RouterProvider router={router}/>
    </NextUIProvider>
  </StrictMode>,
)
