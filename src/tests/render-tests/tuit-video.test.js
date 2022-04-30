import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {PersistGate} from "redux-persist/integration/react";
import createPersistStore from "../../redux/store";
import TuitVideo from "../../components/tuits/tuit-video";
import {MOCK_TUIT_WITH_VIDEO} from "./mock-tuits";

const {store, persistor} = createPersistStore();

test("tuit video is rendered", async () => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <TuitVideo tuit={MOCK_TUIT_WITH_VIDEO}/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
    expect(screen.getByTestId("video-display")).toBeInTheDocument();
})