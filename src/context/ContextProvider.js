import { useState, createContext } from "react";
import { BASE_URL } from "../data/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const userData = null;

export const getUserData = () => {
  const data = localStorage.getItem("clientData");
  return data ? JSON.parse(data) : userData;
};

export const AuthProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [userData, setUserData] = useState(getUserData());
  const [authenticated, setAuthenticated] = useState(false);
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  const setAlertMessage = (msg) => {
    setAlertMsg(msg);
  };

  const showAlert = () => {
    setShowAlertDialog(true);
  };

  const closeAlertDialog = (e) => {
    e.preventDefault();
    setShowAlertDialog(false);
    setAlertMessage("");
  };

  const handleSignIn = (e, username, password) => {
    e.preventDefault();
    setShowLoader(true);

    if (username !== "" && password !== "") {
      const user = {
        username,
        password,
      };

      axios
        .post(`${BASE_URL}/api/v1/auth/signIn`, user)
        .then((res) => {
          setShowLoader(false);
          if (res.status === 200) {
            const response = res.data;

            navigate("/dashboard");
            
            setAuthenticated(true);

            setUserData(response);
            setBalance(+response.accountBal);

            localStorage.setItem("clientData", JSON.stringify(response));
          } else {
            setAlertMessage("Incorrect username or password");
            showAlert();
          }
        })
        .catch((err) => {
          console.log(err);
          setShowLoader(false);
          setAlertMessage(`${err.response.data.message}`);
          showAlert();
        });
    } else {
      setAlertMessage("Validation Error: Please enter username and password");
      showAlert();
      setShowLoader(false);
    }
  };

  const handleSignOut = (e) => {
    setAuthenticated(false);
    localStorage.setItem("clientData", null);
    navigate("/");
  };



  return (
    <AuthContext.Provider
      value={{
        closeAlertDialog,
        showAlert,
        showAlertDialog,
        setAlertMessage,
        setShowLoader,
        showLoader,
        alertMsg,
        handleSignIn,
        authenticated,
        balance,
        setBalance,
        handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
