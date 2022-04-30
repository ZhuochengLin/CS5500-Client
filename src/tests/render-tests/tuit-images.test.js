import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {PersistGate} from "redux-persist/integration/react";
import createPersistStore from "../../redux/store";
import {MOCK_TUIT_WITH_IMAGE} from "./mock-tuits";
import TuitImages from "../../components/tuits/tuit-images";

const {store, persistor} = createPersistStore();

jest.mock("../../components/tuits/tuit-image", () => {
    return ({image}) => <div key={image}>image src: {image}</div>;
})

test("tuit images are rendered", async () => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <TuitImages tuit={MOCK_TUIT_WITH_IMAGE}/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
    expect(screen.getByText("image src: https://res.cloudinary.com/cs5500project/image/upload/v1650127721/ktmrneoa6sevpai5xuv9.jpg"))
        .toBeInTheDocument();
})