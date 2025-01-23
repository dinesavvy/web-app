import React from "react";
import "../../app.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store/index";
import AppRoutesMerchant from "./Routes/Index";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutesMerchant />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
