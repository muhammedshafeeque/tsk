import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "./Components/Misc/Loader/Loader";
import StoreContext from "./Context/Store";
import StoreProvider from "./Context/Store";
function App() {
  const Home = React.lazy(() => import("./Screens/Home/Home"));
  const Login = React.lazy(() => import("./Screens/Login/Login"));
  return (
    <div className="App">
      <Router>
        <StoreProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/Home" element={<Home />} />
          </Routes>
        </Suspense>
        </StoreProvider>
      </Router>
    </div>
  );
}

export default App;
