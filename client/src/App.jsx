import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "./Components/Misc/Loader/Loader";
import StoreProvider from "./Context/Store";
function App() {
  const Home = React.lazy(() => import("./Screens/Home/Home"));
  const Login = React.lazy(() => import("./Screens/Login/Login"));
  const ViewInvoice=React.lazy(()=>import("./Screens/ViewInvoice/ViewInvoice"))
  
  return (
    <div className="App">
      <Router>
        <StoreProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Login />} exact />
            <Route path="/Home" element={<Home />} />
            <Route path="/view-invoice/:id"  element={<ViewInvoice  />} />
          </Routes>
        </Suspense>
        </StoreProvider>
      </Router>
    </div>
  );
}

export default App;
