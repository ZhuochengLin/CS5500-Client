import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./components/home";
import NoSuchScreen from "./components/NoSuchScreen";
import {Login} from "./components/profile/login";
import Signup from "./components/profile/signup";
import Explore from "./components/explore";
import Notifications from "./components/notifications";
import Messages from "./components/messages";
import Bookmarks from "./components/bookmarks";
import Lists from "./components/lists";
import Profile from "./components/profile";
import EditProfile from "./components/profile/edit-profile";
import More from "./components/more";
import TuitScreen from "./components/tuits/tuit-screen";
import MyTuits from "./components/profile/my-tuits";
import TuitsAndReplies from "./components/profile/tuits-and-replies";
import Media from "./components/profile/my-media";
import MyLikes from "./components/profile/my-likes";
import MyDislikes from "./components/profile/my-dislikes";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<App/>}>
                <Route index element={<Home/>}/>
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/tuiter"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"*"} element={<NoSuchScreen/>}/>
                      <Route path="/signup" element={<Signup/>}/>
                      <Route path="/tuiter/:uid" element={<Home/>}/>
                      <Route path="/home/:uid" element={<Home/>}/>
                      <Route path="/explore" element={<Explore/>}/>
                      <Route path="/notifications" element={<Notifications/>}/>
                      <Route path="/messages" element={<Messages/>}/>
                      <Route path="/bookmarks" element={<Bookmarks/>}/>
                      <Route path="/lists" element={<Lists/>}/>
                        <Route path="/profile/*" element={<Profile/>}>
                            <Route index element={<MyTuits/>}/>
                            <Route index path="mytuits" element={<MyTuits/>}/>
                            <Route path="tuits-and-replies" element={<TuitsAndReplies/>}/>
                            <Route path="mymedia" element={<Media/>}/>
                            <Route path="likes" element={<MyLikes/>}/>
                            <Route path="dislikes" element={<MyDislikes/>}/>
                        </Route>
                      <Route path="/profile/edit" element={<EditProfile/>}/>
                      <Route path="/more" element={<More/>}/>
                      <Route path="/tuit/:tid" element={<TuitScreen/>}/>
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
