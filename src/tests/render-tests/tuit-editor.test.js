import {fireEvent, render, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import CreateTuitComponent from "../../components/CreateTuitComponent";
import {PersistGate} from "redux-persist/integration/react";
import createPersistStore from "../../redux/store";
import {useState} from "react";

const {store, persistor} = createPersistStore();

test("tuit text area on change event triggers handler", async () => {
    let tuitText = "";
    const root = render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CreateTuitComponent files={[]} tuitText={tuitText} textAreaOnChange={(e) => tuitText=e.target.value}/>
            </PersistGate>
        </Provider>
    );

    let editor = root.getByTestId("tuit-editor");

    await waitFor(() =>
        fireEvent.change(editor, {
            target: { value: "I typed something" },
        })
    );
    expect(tuitText).toBe("I typed something");
});