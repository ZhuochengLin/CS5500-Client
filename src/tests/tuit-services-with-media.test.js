import * as tuitServices from "../services/tuits-service";
import * as authServices from "../services/auth-service";
import * as userServices from "../services/users-service";
import {MY} from "../services/utils";

const fs = require("fs");

jest.setTimeout(10000);

jest.mock("../services/utils.js", () => {
    return {
        TUITS_API: "https://cs5500-project-server.herokuapp.com/api/tuits",
        USERS_API: "https://cs5500-project-server.herokuapp.com/api/users",
        AUTH_API: "https://cs5500-project-server.herokuapp.com/api/auth"
    }
});

const MOCK_USER = {
    username: "only for test media",
    password: "haha"
}

const IMAGE1_PATH = `${__dirname}/test-media/image1.jpg`;
const IMAGE2_PATH = `${__dirname}/test-media/image2.jpg`;
const VIDEO_PATH = `${__dirname}/test-media/video.mp4`;

describe("login as normal user", () => {

    let mockUser = {};

    beforeAll(async () => {
        mockUser = await authServices.register(MOCK_USER);
    })

    afterAll(async () => {
        await authServices.login({username: "admin", password: "admin"});
        await userServices.deleteUser(mockUser._id);
        await authServices.logout();
    })

    test("create tuit with one image", async () => {
        const imageData = fs.readFileSync(IMAGE1_PATH);
        const blob = new Blob([imageData], {type: "image/jpeg"})
        const tuitFormData = new FormData();
        tuitFormData.append("tuit", "test media");
        tuitFormData.append("image", blob);
        const tuit = await tuitServices.createTuit(MY, tuitFormData);
        expect(tuit.image.length).toBe(1);

        await tuitServices.deleteTuit(tuit._id);
    })

    test("create tuit with two image", async () => {
        const tuitFormData = new FormData();
        for (const imagePath of [IMAGE1_PATH, IMAGE2_PATH]) {
            const imageData = fs.readFileSync(imagePath);
            const blob = new Blob([imageData], {type: "image/jpeg"})
            tuitFormData.append("image", blob);
        }
        tuitFormData.append("tuit", "test media");
        const tuit = await tuitServices.createTuit(MY, tuitFormData);
        expect(tuit.image.length).toBe(2);

        await tuitServices.deleteTuit(tuit._id);
    })

    test("create tuit with one video", async () => {
        const tuitFormData = new FormData();
        const videoData = fs.readFileSync(VIDEO_PATH);
        const blob = new Blob([videoData], {type: "video/mp4"})
        tuitFormData.append("video", blob);
        tuitFormData.append("tuit", "test media");
        const tuit = await tuitServices.createTuit(MY, tuitFormData);
        expect(tuit.video.length).toBe(1);

        await tuitServices.deleteTuit(tuit._id);
    })

    test("create tuit with both image and video will be rejected", async () => {
        const tuitFormData = new FormData();
        const imageData = fs.readFileSync(IMAGE1_PATH);
        const videoData = fs.readFileSync(VIDEO_PATH);
        tuitFormData.append("tuit", "test media");
        tuitFormData.append("image", new Blob([imageData], {type: "image/jpeg"}));
        tuitFormData.append("video", new Blob([videoData], {type: "video/mp4"}));
        const tryCreateTuitWithBothMedia = async () => {
            await tuitServices.createTuit(MY, tuitFormData);
        }
        await expect(tryCreateTuitWithBothMedia).rejects.toThrow();
    })

})