import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Router>
     <Routes>
  <Route path="/" element={<Navigate to="/signin" />} /> 
  <Route path="/signin" element={<Signin />} />
  <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/signin" />} />
</Routes>
    </Router>
  );
};

export default App;
