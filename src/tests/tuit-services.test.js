import * as tuitServices from "../services/tuits-service";
import * as authServices from "../services/auth-service";
import * as userServices from "../services/users-service";

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

test("find all tuits", async () => {
    const tuits = await tuitServices.findAllTuits();
    expect(tuits.length).toBeGreaterThan(0);
})


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

})