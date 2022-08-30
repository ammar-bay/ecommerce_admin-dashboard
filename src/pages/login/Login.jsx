import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Store } from "../../utils/Store";
import { publicRequest } from "../../utils/axios";
import { useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { state, dispatch } = useContext(Store);

  useEffect(()=>{
    if(state.user){
      history.replace("/")
    }
  },[])

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("/auth/login", { email, password });
      dispatch({ type: "USER_LOGIN", payload: res.data });
      history.push("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;
