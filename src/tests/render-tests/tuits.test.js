import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import React from "react";
import Tuits from "../../components/tuits";
import {PersistGate} from "redux-persist/integration/react";
import createPersistStore from "../../redux/store";

const {store, persistor} = createPersistStore();

jest.mock("../../components/tuits/tuit", () => {
    return ({tuit}) => <div key={tuit._id}>{tuit.tuit}</div>;
})

test("multiple tuits are rendered correctly in corresponding Tuit components", async () => {
    render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Tuits tuits={[{_id: 1, tuit: "mock tuit 1"}, {_id: 2, tuit: "mock tuit 2"}]}/>
            </PersistGate>
        </Provider>
    );
    expect(screen.getByText("mock tuit 1")).toBeInTheDocument();
    expect(screen.getByText("mock tuit 2")).toBeInTheDocument();
})