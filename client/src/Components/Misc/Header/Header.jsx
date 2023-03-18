import React from "react";
import "./header.scss";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="header">
      <Text className="Header_text">Shopping mania</Text>
      <p onClick={handleLogout}>Logout</p>
    </div>
  );
}

export default Header;
