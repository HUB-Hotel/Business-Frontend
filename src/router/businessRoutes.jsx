import { Navigate } from "react-router-dom";
import BusinessLayout from "../components/layout/BusinessLayout";
import BusinessLoginPage from "../pages/auth/BusinessLoginPage";
import BusinessDashboardPage from "../pages/business/BusinessDashboardPage";
import BusinessRoomListPage from "../pages/business/BusinessRoomListPage";
import BusinessStatisticsPage from "../pages/business/BusinessStatisticsPage";
import BusinessReviewListPage from "../pages/business/BusinessReviewListPage";

const businessRoutes = [
  {
    path: "/business/login",
    element: <BusinessLoginPage />,
  },
  {
    path: "/business",
    element: <BusinessLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/business/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <BusinessDashboardPage />,
      },
      {
        path: "rooms",
        element: <BusinessRoomListPage />,
      },
      {
        path: "statistics",
        element: <BusinessStatisticsPage />,
      },
      {
        path: "reviews",
        element: <BusinessReviewListPage />,
      },
    ],
  },
];

export default businessRoutes;
