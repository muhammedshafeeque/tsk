import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Api/Axios";
const StoreContext = createContext();
const StoreProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [config, setConfig] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      let configs = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      axios.get("user/req-user", configs).then((res) => {
        if (res.data.error) {
          localStorage.removeItem("token");
          setUser(null)
          navigate("/");
        } else {
          setUser(res.data);
        }
      });
    }
  }, [navigate]);
  useEffect(() => {
    if (user) {
      setConfig({
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
    }else{
      setUser(null)
      navigate("/");
    }
  }, [user,navigate]);
  return (
    <StoreContext.Provider value={{ user, setUser, config, setConfig }}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
export const Store = () => {
  return useContext(StoreContext);
};
