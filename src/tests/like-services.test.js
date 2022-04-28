import * as tuitServices from "../services/tuits-service";
import * as authServices from "../services/auth-service";
import * as userServices from "../services/users-service";
import * as likeServices from "../services/likes-service";
import {MY} from "../services/utils";

jest.setTimeout(10000);

jest.mock("../services/utils.js", () => {
    return {
        TUITS_API: "https://cs5500-project-server.herokuapp.com/api/tuits",
        USERS_API: "https://cs5500-project-server.herokuapp.com/api/users",
        AUTH_API: "https://cs5500-project-server.herokuapp.com/api/auth"
    }
});

const MOCK_USER = {
    username: "only for test",
    password: "haha"
}

const MOCK_TUIT = {
    tuit: "test tuits"
}

describe("no login user", () => {

    test("user cannot like", async () => {
        const tryToLikeATuit = async () => {
            await likeServices.userLikesTuit(MY, tuit._id);
        }
        await expect(tryToLikeATuit).rejects.toThrow();
    })

})

describe("login as normal user", () => {

    let mockUser = {};
    let tuit = {};

    beforeAll(async () => {
        mockUser = await authServices.register(MOCK_USER);
    })

    afterAll(async () => {
        await authServices.login({username: "admin", password: "admin"});
        await userServices.deleteUser(mockUser._id);
        await authServices.logout();
    })

    test("user likes tuit", async () => {
        tuit = await tuitServices.createTuit(mockUser._id, MOCK_TUIT)
        expect(tuit.stats.likes).toBe(0);

        await likeServices.userLikesTuit(MY, tuit._id);
        tuit = await tuitServices.findTuitById(tuit._id);
        expect(tuit.stats.likes).toBe(1);

        // clean up
        await likeServices.userLikesTuit(MY, tuit._id);
        await tuitServices.deleteTuit(tuit._id);
    })

    test("user unlikes tuit", async () => {
        tuit = await tuitServices.createTuit(mockUser._id, MOCK_TUIT)
        expect(tuit.stats.likes).toBe(0);

        await likeServices.userLikesTuit(MY, tuit._id);
        tuit = await tuitServices.findTuitById(tuit._id);
        expect(tuit.stats.likes).toBe(1);

        // call userLikesTuit() again to toggle like
        await likeServices.userLikesTuit(MY, tuit._id);
        tuit = await tuitServices.findTuitById(tuit._id);
        expect(tuit.stats.likes).toBe(0);

        // clean up
        await tuitServices.deleteTuit(tuit._id);
    })

    test("user already likes a tuit", async () => {
        tuit = await tuitServices.createTuit(mockUser._id, MOCK_TUIT)
        expect(await likeServices.userAlreadyLikedTuit(mockUser._id, tuit._id)).toBeFalsy();
        await likeServices.userLikesTuit(MY, tuit._id);
        expect(await likeServices.userAlreadyLikedTuit(mockUser._id, tuit._id)).toBeTruthy();

        // clean up
        await likeServices.userLikesTuit(MY, tuit._id);
        await tuitServices.deleteTuit(tuit._id);
    })

    test("find all tuits liked by user", async () => {
        tuit = await tuitServices.createTuit(mockUser._id, MOCK_TUIT);
        expect((await likeServices.findAllTuitsLikedByUser(mockUser._id)).length).toBe(0)
        await likeServices.userLikesTuit(MY, tuit._id);

        const likedTuits = await likeServices.findAllTuitsLikedByUser(mockUser._id);
        expect(likedTuits.length).toBe(1);
        expect(likedTuits[0].tuit).toBe(MOCK_TUIT.tuit);

        // clean up
        await likeServices.userLikesTuit(MY, tuit._id);
        await tuitServices.deleteTuit(tuit._id);
    })

})