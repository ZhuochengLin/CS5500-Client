import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {PersistGate} from "redux-persist/integration/react";
import createPersistStore from "../../redux/store";
import TuitStats from "../../components/tuits/tuit-stats";

const {store, persistor} = createPersistStore();

const MOCK_TUIT_STATS = {
    "stats": {
        "replies": 12,
        "retuits": 13,
        "likes": 14
    }
}

test("tuit stats are rendered", async () => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <TuitStats tuit={MOCK_TUIT_STATS}/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("13")).toBeInTheDocument();
    expect(screen.getByText("14")).toBeInTheDocument();
})