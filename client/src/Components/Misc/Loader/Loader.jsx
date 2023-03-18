import { Spinner } from "@chakra-ui/react";
import React from "react";
import "./loader.scss";
function Loader() {
  return (
    <div className="loader_body">
      <Spinner color="red.500" size="xl" />
    </div>
  );
}

export default Loader;
