import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import Tuit from "../../components/tuits/tuit";
import {PersistGate} from "redux-persist/integration/react";
import createPersistStore from "../../redux/store";
import {BrowserRouter} from "react-router-dom";
import {MOCK_TUIT_WITH_IMAGE, MOCK_TUIT_WITH_ONLY_TEXT, MOCK_TUIT_WITH_VIDEO} from "./mock-tuits";

const {store, persistor} = createPersistStore();

jest.mock("../../components/Avatar", () => {
    return ({user}) => <div key={user._id}>avtar: {user.profilePhoto}</div>;
})
jest.mock("../../components/tuits/tuit-stats", () => {
    return ({tuit}) => <div key={tuit._id}>likes: {tuit.stats.likes}</div>;
})

test("tuit with only text is rendered correctly", async () => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Tuit tuit={MOCK_TUIT_WITH_ONLY_TEXT}/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
    // check tuit content
    expect(screen.getByText("only text")).toBeInTheDocument();
    // check username and handle
    expect(screen.getByText("lin@lin", {exact: false})).toBeInTheDocument();
    // check posted time translation
    expect(screen.getByText("13d", {exact: false})).toBeInTheDocument();
    // check avatar
    expect(screen.getByText("avtar: https://res.cloudinary.com/cs5500project/image/upload/v1649821366/ne4hga3vslacwvdgbd0c.png"))
        .toBeInTheDocument();
    // check tuit stats
    expect(screen.getByText("likes: 0")).toBeInTheDocument();
})

jest.mock("../../components/tuits/tuit-images", () => {
    return ({tuit}) => <div key={tuit._id}>image length: {tuit.image.length}</div>;
})
test("tuit with images is rendered correctly", async () => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Tuit tuit={MOCK_TUIT_WITH_IMAGE}/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
    // check tuit
    expect(screen.getByText("I'm new here")).toBeInTheDocument();
    // check image
    expect(screen.getByText("image length: 1")).toBeInTheDocument();
})

jest.mock("../../components/tuits/tuit-video", () => {
    return ({tuit}) => <div key={tuit._id}>video length: {tuit.video.length}</div>;
})
test("tuit with video is rendered correctly", async () => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Tuit tuit={MOCK_TUIT_WITH_VIDEO}/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
    // check tuit
    expect(screen.getByText("Something interesting")).toBeInTheDocument();
    // check image
    expect(screen.getByText("video length: 1")).toBeInTheDocument();
})