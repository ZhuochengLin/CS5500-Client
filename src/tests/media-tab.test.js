import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import MyMedia from "../components/profile/my-media";
import {PersistGate} from "redux-persist/integration/react";
import createPersistStore from "../redux/store";
import React from "react";
import {createMemoryHistory} from "history";

const {store, persistor} = createPersistStore();

jest.mock("../components/tuits", () => {
    return () => <div>MOCK TUITS</div>;
})
test("my media has tuits component", async () => {
    const history = createMemoryHistory()
    history.push('/profile/mymedia')
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <MyMedia/>
            </PersistGate>
        </Provider>
    );
    expect(screen.getByText("MOCK TUITS")).toBeInTheDocument();
})