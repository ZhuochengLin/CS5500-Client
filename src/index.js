import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Tuiter from "./components/tuiter";
import Home from "./components/home";
import NoSuchScreen from "./components/NoSuchScreen";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<App/>}>
                <Route index element={<Home/>}/>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/tuiter"} element={<Home/>}/>
                <Route path={"*"} element={<NoSuchScreen/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
