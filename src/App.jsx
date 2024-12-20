import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Index";
import Toast from "./shared/components/Toast";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toast />
    </BrowserRouter>
  );
}

export default App;
