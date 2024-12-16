import { Route, Routes } from "react-router-dom";
import adminRoutes from "./adminRoutes";
import distributerRoutes from "./distributerRoutes";
import PrivateRoute from "./PrivateRoute";

const routeMap = {
  admin: adminRoutes,
  distributer: distributerRoutes,
  // Add other panels here
};

const AppRoutes = () => {
  const currentPanel = window.location.pathname.split("/")[1]; // Extract panel from URL
  const routes = routeMap[currentPanel] || [];

  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <Route
            path={route?.path}
            key={"route_" + index}
            element={
              route.isPrivate ? (
                <>
                  <PrivateRoute redirectPath="/">
                    {/* <Sidebar /> */}
                    <route.element />
                    {/* <Footer /> */}
                  </PrivateRoute>
                </>
              ) : route?.isLayout ? (
                <route.element />
              ) : (
                <route.element />
              )
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default AppRoutes;
