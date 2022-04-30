import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {PersistGate} from "redux-persist/integration/react";
import createPersistStore from "../../redux/store";
import TuitImage from "../../components/tuits/tuit-image";

const {store, persistor} = createPersistStore();

test("tuit images are rendered", async () => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <TuitImage image={"https://res.cloudinary.com/cs5500project/image/upload/v1650127721/ktmrneoa6sevpai5xuv9.jpg"}/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
    expect(screen.getByTestId("image-display")).toBeInTheDocument();
})