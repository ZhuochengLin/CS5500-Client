import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Profile from "../components/profile";
import MyTuits from "../components/profile/my-tuits";
import MyMedia from "../components/profile/my-media";
import React from "react";
import createPersistStore from "../redux/store";
import {PersistGate} from "redux-persist/integration/react";
import App from "../App";

const {store, persistor} = createPersistStore();

jest.mock("react-redux", () => {
    return {
        ...jest.requireActual("react-redux"),
        useSelector: () => true
    }
})
jest.mock("../components/profile/my-media", () => {
    return () => <div>MOCK MEDIA TAB</div>;
})
test("my profile has media tab", async () => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MemoryRouter initialEntries={["/profile/mymedia"]}>
                    <App/>
                </MemoryRouter>
            </PersistGate>
        </Provider>
    );
    expect(screen.getByText("MOCK MEDIA TAB")).toBeInTheDocument();
})