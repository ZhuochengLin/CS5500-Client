import React, {useEffect} from "react";
import './styles.css';
import {Outlet, useNavigate} from "react-router-dom";
import Navigation from "./components/navigation";
import WhatsHappening from "./components/whats-happening";

function App() {
  return (
    <div className={"container"}>
      <div className={"row"}>
        <div className={"col-2 col-md-2"}>
          <Navigation/>
        </div>
        <div className={"col-10 col-md-6"}>
          <Outlet/>
        </div>
        <div className={"col col-md-4 d-none d-md-block"}>
          <WhatsHappening/>
        </div>
      </div>
    </div>
  );
}

export default App;
