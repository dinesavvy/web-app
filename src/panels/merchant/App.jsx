import React from "react";
import "../../app.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store/businessStore";
import AppRoutesMerchant from "./Routes/Index";
import { BusinessProvider } from "../../common/Layout/BusinessContext";

const App = () => {
  return (
    <Provider store={store}>
      <BusinessProvider>
        <BrowserRouter>
          <AppRoutesMerchant />
        </BrowserRouter>
      </BusinessProvider>
    </Provider>
  );
};

export default App;
