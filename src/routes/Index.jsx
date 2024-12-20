import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import adminRoutes from "./adminRoutes";
import distributorRoutes from "./distributorRoutes";
import PrivateRoute from "./PrivateRoute";
import Sidebar from "../shared/components/Layout/Sidebar";
import Header from "../shared/components/Layout/Header";
import supplierRoutes from "./supplierRoutes";
import merchantRoutes from "./merchantRoutes";

const routeMap = {
  admin: adminRoutes,
  distributor: distributorRoutes,
  supplier: supplierRoutes,
  merchant: merchantRoutes,
  // Add other panels here
};

const AppRoutes = () => {
  const currentPanel = window.location.pathname.split("/")[1]; // Extract panel from URL
  const routes = routeMap[currentPanel] || [];
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => setIsOpen(!isOpen);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflowHidden");
    } else {
      document.body.classList.remove("overflowHidden");
    }

    // Cleanup to avoid lingering effects if the component unmounts
    return () => {
      document.body.classList.remove("overflowHidden");
    };
  }, [isOpen]);
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
                    <Sidebar />
                    <route.element />
                    {/* <Footer /> */}
                  </PrivateRoute>
                </>
              ) : route?.isLayout ? (
                <>
                  <div className="d-flex h-100 w-100 ">
                    <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                    <div className="rightSide">
                      <Header handleTrigger={handleTrigger} />
                      <route.element />
                    </div>
                  </div>
                </>
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
