import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import {AuthLayout} from "./components/index.js"
import "./index.css";
import App from "./App.jsx";
import { Home } from "./components/index.js";
import { Login } from "./components/index.js";
import { Signup } from "./components/index.js";
import Jobs from "./components/Jobs.jsx";
import MyMessages from "./components/MyMessages.jsx";
import PostJobs from "./components/PostJobs.jsx";
import MentorProfile from "./components/Mentor/MentorProfile.jsx";
import EmployeerProfile from "./components/Employeer/EmployeerProfile.jsx";
import MentorLoginForm from "./components/LoginasMentor.jsx";
import EmployerLoginForm from "./components/LoginasEmployeer.jsx";
import MentorSearchPage from "./components/MentorSearchPage.jsx";
import AllJobs from "./components/AllJobs.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import UserProfile from "./components/ProfileCard.jsx";
import JobBoard from "./components/Jobs/jobBoard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
        loader: () => {
          console.log("Login route matched");
          return null;
        },
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/jobs",
        element: (
          <AuthLayout authentication>
            <JobBoard />
          </AuthLayout>
        ),
      },
      {
        path: "/interactions",
        element: (
          // <AuthLayout authentication={false}>
          //     <Signup />
          // </AuthLayout>
          <AuthLayout authentication>
            <MyMessages />
          </AuthLayout>
        ),
      },
      {
        path: "/addJob/:jobId",
        element: (
          <AuthLayout authentication>
            <PostJobs />
          </AuthLayout>
        ),
      },
      {
        path: "/mentors",
        element: (
          <AuthLayout authentication>
            <MentorSearchPage />
          </AuthLayout>
        ),
      },
      {
        path: "/employeer",
        element: (
          <AuthLayout authentication>
            <EmployerLoginForm />
          </AuthLayout>
        ),
      },
      {
        path: "/mentor-profile/:mentorId",
        element:(
          <AuthLayout authentication>
            <MentorProfile/>
          </AuthLayout>
        )
      },
      {
        path:"/profile/:profileId",
        element:(
          <AuthLayout authentication>
            <UserProfile/>
          </AuthLayout>
        )
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  </StrictMode>
);
