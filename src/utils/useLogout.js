import { useContext } from "react";
import { Store } from "./Store";

const useLogout = () => {
  const { dispatch } = useContext(Store);
  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };
  return logout
};

export default useLogout;
