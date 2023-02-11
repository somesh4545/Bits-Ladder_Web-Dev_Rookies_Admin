import AuthGuard from "components/authentication/AuthGuard";
import GuestGuard from "components/authentication/GuestGuard";
import DashboardLayout from "components/Layouts/DashboardLayout";
import LoadingScreen from "components/LoadingScreen";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// authentication pages
const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const Register = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const ForgetPassword = Loadable(
  lazy(() => import("./pages/authentication/ForgetPassword"))
);

// Dashboard pages
const DashboardSaaS = Loadable(lazy(() => import("./pages/dashboards/SaaS")));

// user profile
const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));

// workers page
const WorkersPage = Loadable(lazy(() => import("./pages/Workers")));
const CLientPage = Loadable(lazy(() => import("./pages/Client")));
const PairsPage = Loadable(lazy(() => import("./pages/Pairs")));

// user management
const UserList = Loadable(
  lazy(() => import("./pages/userManagement/UserList"))
);
const UserGrid = Loadable(
  lazy(() => import("./pages/userManagement/UserGrid"))
);
const AddNewUser = Loadable(
  lazy(() => import("./pages/userManagement/AddNewUser"))
);

// error
const Error = Loadable(lazy(() => import("./pages/404")));

// routes
const routes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />,
  },
  {
    path: "login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: "register",
    element: (
      <GuestGuard>
        <Register />
      </GuestGuard>
    ),
  },
  {
    path: "forget-password",
    element: (
      <GuestGuard>
        <ForgetPassword />
      </GuestGuard>
    ),
  },
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DashboardSaaS />,
      },
      {
        path: "workers",
        element: <WorkersPage />,
      },
      {
        path: "clients",
        element: <CLientPage />,
      },
      {
        path: "pairs",
        element: <PairsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default routes;
