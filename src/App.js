import React from "react";
import './styles.css';
import {Outlet, Route, Routes} from "react-router-dom";
import Navigation from "./components/navigation";
import WhatsHappening from "./components/whats-happening";
import Home from "./components/home";
import {Login} from "./components/profile/login";
import NoSuchScreen from "./components/NoSuchScreen";
import Signup from "./components/profile/signup";
import Explore from "./components/explore";
import Notifications from "./components/notifications";
import Messages from "./components/messages";
import Bookmarks from "./components/bookmarks";
import Lists from "./components/lists";
import Profile from "./components/profile";
import MyTuits from "./components/profile/my-tuits";
import TuitsAndReplies from "./components/profile/tuits-and-replies";
import MyMedia from "./components/profile/my-media";
import MyLikes from "./components/profile/my-likes";
import MyDislikes from "./components/profile/my-dislikes";
import EditProfile from "./components/profile/edit-profile";
import More from "./components/more";
import TuitScreen from "./components/tuits/tuit-screen";
import TuitEdit from "./components/tuits/tuit-edit";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={
                <>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-2 col-lg-2"}>
                                <Navigation/>
                            </div>
                            <div className={"col-10 col-lg-6"}>
                                <Outlet/>
                            </div>
                            <div className={"col col-md-4 d-none d-lg-block"}>
                                <WhatsHappening/>
                            </div>
                        </div>
                    </div>
                </>
            }>
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
                    <Route path="mymedia" element={<MyMedia/>}/>
                    <Route path="likes" element={<MyLikes/>}/>
                    <Route path="dislikes" element={<MyDislikes/>}/>
                </Route>
                <Route path="/profile/edit" element={<EditProfile/>}/>
                <Route path="/more" element={<More/>}/>
                <Route path="/tuit/:tid" element={<TuitScreen/>}/>
                <Route path="/tuit/:tid/edit" element={<TuitEdit/>}/>
            </Route>
        </Routes>
    );
}

export default App;
