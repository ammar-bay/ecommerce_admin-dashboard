import React from "react";
import "./topbar.css";
import { ExitToApp, Settings } from "@material-ui/icons";
import Cookies from "js-cookie";
import useLogout from "../../utils/useLogout";
import { useHistory } from "react-router-dom";
export default function Topbar() {
  const logout = useLogout();
  const history = useHistory();
  const signouthandler = () => {
    console.log("Logout");
    Cookies.remove("user");
    logout();
    history.replace("/login");
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Ammar.</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <button style={{ all: "unset" }} onClick={signouthandler}>
              <ExitToApp />
            </button>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}
