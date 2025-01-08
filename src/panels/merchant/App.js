import React from "react";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Dashboard from "../admin/Components/AdminDashboard";

const AdminApp = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default AdminApp;
