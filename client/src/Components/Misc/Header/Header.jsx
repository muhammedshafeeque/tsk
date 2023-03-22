import React from "react";
import "./header.scss";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../../Context/Store";
function Header() {
  const navigate = useNavigate();
  const {setUser} =Store()
  const handleLogout = () => {
    localStorage.clear();
    setUser(null)
    navigate("/");
  };
  return (
    <div className="header">
      <Text className="Header_text" onClick={()=>{navigate('/home')}}>Shopping mania</Text>
      <p onClick={handleLogout}>Logout</p>
    </div>
  );
}

export default Header;
