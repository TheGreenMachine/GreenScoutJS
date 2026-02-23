import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authContext";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../components/homepage/Home";
import Matchform from "../components/matchform/Matchform";
import Login from "../components/loginpage/Login";
import Logout from "../components/loginpage/Logout";

const RoutesList = ({ accounts }) => {
  const { token } = useAuth();

  const routesForPublic = [];

  const routesForAuthenticatedOnly = [
    {
      path: "/GreenScoutJS",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/GreenScoutJS/login",
          element: <Home />,
        },
        {
          path: "/GreenScoutJS/home",
          element: <Home />,
        },
        {
          path: "/GreenScoutJS/match",
          element: <Matchform />,
        },
        {
          path: "/GreenScoutJS/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/GreenScoutJS/login",
      element: <Login accounts={accounts} />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default RoutesList;
