import React from "react";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import merchantRoutes from "./merchantRoutes";
import PrivateRoute from "./PrivateRoute";
import Sidebar from "../../../common/Layout/Sidebar";
import Header from "../../../common/Layout/Header";
import { CommonMessageProvider } from "../../../common/CommonMessage";

const routeMap = {
  merchant: merchantRoutes,
};


const AppRoutesMerchant = () => {
  const routes = routeMap["merchant"] || [];
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => setIsOpen(!isOpen);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflowHidden");
    } else {
      document.body.classList.remove("overflowHidden");
    }

    return () => {
      document.body.classList.remove("overflowHidden");
    };
  }, [isOpen]);
  return (
    <>
      <CommonMessageProvider>
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
      </CommonMessageProvider>
    </>
  );
};

export default AppRoutesMerchant;
