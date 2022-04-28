import {fireEvent, waitFor} from "@testing-library/react";
import {render} from "@testing-library/react";
import CreateTuit from "../components/CreateTuit";
import createPersistStore from "../redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import CreateTuitComponent from "../components/CreateTuitComponent";

const {store, persistor} = createPersistStore();

test("image uploader exists", () => {
    const root = render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CreateTuitComponent files={[]} tuitText={""}/>
            </PersistGate>
        </Provider>
    );
    let uploader = root.getByTestId("image-uploader");
    expect(uploader).toBeInTheDocument();
})

test("video uploader exists", () => {
    const root = render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <CreateTuitComponent files={[]} tuitText={""}/>
            </PersistGate>
        </Provider>
    );
    let uploader = root.getByTestId("video-uploader");
    expect(uploader).toBeInTheDocument();
})


describe("upload files", () => {
    let imageFile;
    let videoFile;

    beforeEach(() => {
        imageFile = new File(["just a mock"], "mock.jpg", { type: "image/jpeg" });
        videoFile = new File(["just a mock"], "mock.mp4", { type: "video/mp4" });
    });

    test("upload image by clicking the image uploader ", async () => {
        const root = render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <CreateTuitComponent files={[]} tuitText={""}/>
                </PersistGate>
            </Provider>
        );

        let uploader = root.getByTestId("image-uploader");

        await waitFor(() =>
            fireEvent.change(uploader, {
                target: { files: [imageFile] },
            })
        );
        let image = document.getElementById("image-uploader");

        expect(image.files[0].name).toBe("mock.jpg");
        expect(image.files.length).toBe(1);
    });

    test("upload video by clicking the video uploader ", async () => {
        const root = render(
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <CreateTuitComponent files={[]} tuitText={""}/>
                </PersistGate>
            </Provider>
        );

        let uploader = root.getByTestId("video-uploader");

        await waitFor(() =>
            fireEvent.change(uploader, {
                target: { files: [videoFile] },
            })
        );
        let video = document.getElementById("video-uploader");

        expect(video.files[0].name).toBe("mock.mp4");
        expect(video.files.length).toBe(1);
    });
});