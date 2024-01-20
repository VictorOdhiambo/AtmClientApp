import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AlertBox from "./components/AlertBox";
import { useContext, useEffect } from "react";
import AuthContext from "./context/ContextProvider";
import Loader from "./components/Loader";

function App() {
  const { showAlertDialog, alertMsg, showLoader, authenticated } = useContext(AuthContext);
  
  const navigate = useNavigate();

  useEffect(()=> {
    if (!authenticated){
      navigate("/");
    }
  }, [])

  return (
    <div>
      <Loader show={showLoader} />
      <AlertBox message={alertMsg} show={showAlertDialog} />

      {authenticated ? (<Dashboard />) : ""}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
