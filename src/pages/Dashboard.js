import React, { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../data/BaseUrl";
import { AuthContext, getUserData } from "../context/ContextProvider";
import Logo from "../assets/logo.png";

function Dashboard() {
  const [withdrawTabActive, setWithdrawTabActive] = useState(false);
  const [transactTabActive, setTransactTabActive] = useState(false);
  const [withdrawalAmount, setWithdrawalAmt] = useState(0);
  const [transferAmount, setTransferAmt] = useState(0);
  const [accountTo, setAccountTo] = useState(null);

  const {
    setShowLoader,
    setAlertMessage,
    showAlert,
    balance,
    setBalance,
    handleSignOut,
  } = useContext(AuthContext);

  const clientData = getUserData();

  const toggleTabs = (e, tab) => {
    e.preventDefault();

    if (tab === "withdraw") {
      setTransactTabActive(false);
      setWithdrawTabActive(true);
    } else {
      setWithdrawTabActive(false);
      setTransactTabActive(true);
    }
  };

  const withdrawFunds = (e) => {
    e.preventDefault();
    setShowLoader(true);

    const payload = {
      userId: clientData.userId,
      amount: withdrawalAmount,
      atmId: clientData.atmId,
      accountNoTo: accountTo,
    };

    axios
      .post(`${BASE_URL}/api/v1/atm/withdraw-funds`, payload, {
        headers: { Authorization: `Bearer ${clientData.token}` },
      })
      .then((res) => {
        setShowLoader(false);
        if (res.status === 200) {
          setBalance(balance - payload.amount);
          setAlertMessage(res.data.message);
          showAlert();
        } else {
          setAlertMessage("Funds withdrawal failed.");
          showAlert();
        }
      })
      .catch((err) => {
        setShowLoader(false);
        setAlertMessage(`${err.response.data.message}`);
        showAlert();
      });
  };

  const transferFunds = (e) => {
    e.preventDefault();
    setShowLoader(true);

    const payload = {
      userId: 1,
      amount: transferAmount,
      atmId: 1,
      accountNoTo: accountTo,
    };

    axios
      .post(`${BASE_URL}/api/v1/atm/transfer-funds`, payload, {
        headers: { Authorization: `Bearer ${clientData.token}` },
      })
      .then((res) => {
        setShowLoader(false);
        if (res.status === 200) {
          setBalance(balance - payload.amount);
          setAlertMessage(res.data.message);
          showAlert();
        } else {
          setAlertMessage("Funds transfer failed.");
          showAlert();
        }
      })
      .catch((err) => {
        setShowLoader(false);
        setAlertMessage(`${err.response.data.message}`);
        showAlert();
      });
  };


  return (
    <div className="dashboard">
      <aside>
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="user-detail">
          <ul>
            <li>{clientData?.userName.toUpperCase()}</li>
            <li>Account No: {clientData?.accountNo}</li>
            <li
              style={{
                marginTop: "30px",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={(e) => handleSignOut()}
            >
              Sign Out
            </li>
          </ul>
        </div>
      </aside>

      <main>
        <div className="account-status">
          <p>Account Status: {clientData?.isActive ? "Active" : "InActive"}</p>
        </div>

        <div className="account-balance">
          <h1>
            Account Balance: Ksh. <span className="amount">{balance}</span>
          </h1>
        </div>

        <div className="transact">
          <button
            className={
              withdrawTabActive
                ? "btn btn-sm btn-warning"
                : "btn btn-sm btn-secondary"
            }
            style={{ marginRight: "5px" }}
            onClick={(e) => toggleTabs(e, "withdraw")}
          >
            Withdraw
          </button>
          <button
            className={
              transactTabActive
                ? "btn btn-sm btn-warning"
                : "btn btn-sm btn-secondary"
            }
            onClick={(e) => toggleTabs(e, "transfer")}
          >
            Transfer Funds
          </button>

          <div className={withdrawTabActive ? "withdraw" : "d-none"}>
            <form action="">
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  name="amount"
                  onChange={(e) => setWithdrawalAmt(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>
              <button
                className="btn btn-sm btn-secondary"
                onClick={(e) => withdrawFunds(e)}
              >
                Withdraw
              </button>
            </form>
          </div>

          <div className={transactTabActive ? "transfer" : "d-none"}>
            <form action="">
              <div className="form-group">
                <label htmlFor="amount">Account To</label>
                <input
                  type="text"
                  name="accountTo"
                  onChange={(e) => setAccountTo(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  name="amount"
                  onChange={(e) => setTransferAmt(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>
              <button
                className="btn btn-sm btn-secondary"
                onClick={(e) => transferFunds(e)}
              >
                Transfer
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
