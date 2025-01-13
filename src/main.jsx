import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home  from "./components/Home.jsx";
import Login from "./components/Auth/Login.jsx";
import Signup  from "./components/Auth/Signup.jsx";
import MyMessages from "./components/Chat/MyMessages.jsx";
import JobPostForm from "./components/Jobs/PostForm.jsx";
import MentorProfile from "./components/Mentor/MentorProfile.jsx";
import EmployerProfile from "./components/Employer/EmployerProfile.jsx";
import EmployerLoginForm from "./components/Employer/LoginasEmployer.jsx";
import MentorSearchPage from "./components/Mentor/MentorSearchPage.jsx";
import UserProfile from "./components/ProfileCard.jsx";
import JobBoard from "./components/Jobs/JobBoard.jsx";
import EmployerDashboard from "./components/Employer/EmployerDashboard.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import MentorDashboard from "./components/Mentor/MentorDashboard.jsx";
import JobDetails from "./components/Jobs/JobDetails.jsx";
import JobApplicationForm from "./components/Jobs/ApplyJob.jsx";
import Protected from "./components/Auth/Protected.jsx";  // Assuming the Protected component is separate
import PublicRoute from "./components/Auth/PublicRoute.jsx";
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
        element: <PublicRoute><Login /></PublicRoute>,
        loader: () => {
          console.log("Login route matched");
          return null;
        },
      },
      {
        path: "/signup",
        element: <PublicRoute><Signup /></PublicRoute>,
      },
      {
        path: "/jobs",
        element: <JobBoard />,
      },
      {
        path: "/interactions",
        element: (
          <Protected authentication={true}>
            <MyMessages />
          </Protected>
        ),
      },
      {
        path: "/addJob",
        element: (
          <Protected authentication={true}>
            <JobPostForm />
          </Protected>
        ),
      },
      {
        path: "/mentors",
        element: <MentorSearchPage />,
      },
      {
        path: "/employer",
        element: (
          <Protected authentication={true}>
            <EmployerProfile />
          </Protected>
        ),
      },
      {
        path: "/mentor-profile/:mentorId",
        element: (
          <Protected authentication={true}>
            <MentorProfile />
          </Protected>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protected authentication={true}>
            <UserProfile />
          </Protected>
        ),
      },
      {
        path: "/employerlogin",
        element: <EmployerLoginForm />,
      },
      {
        path: "/employerdashboard",
        element: (
          <Protected authentication={true}>
            <EmployerDashboard />
          </Protected>
        ),
      },
      {
        path: "/AdminDashboard",
        element: (
          <Protected authentication={true}>
            <AdminDashboard />
          </Protected>
        ),
      },
      {
        path: "/MentorDashboard/:mentorId",
        element: (
          <Protected authentication={true}>
            <MentorDashboard />
          </Protected>
        ),
      },
      {
        path: "/jobs/:jobId",
        element: (
          <Protected authentication={true}>
            <JobDetails />
          </Protected>
        ),
      },
      {
        path: "/apply/:jobId",
        element: (
          <Protected authentication={true}>
            <JobApplicationForm />
          </Protected>
        ),
      },
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
