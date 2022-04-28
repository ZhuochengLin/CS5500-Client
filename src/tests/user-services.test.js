import * as userServices from "../services/users-service";
import * as authServices from "../services/auth-service";
import {findUserById} from "../services/users-service";
import {MY} from "../services/utils";

jest.setTimeout(10000);

jest.mock("../services/utils.js", () => {
    return {
        USERS_API: "https://cs5500-project-server.herokuapp.com/api/users",
        AUTH_API: "https://cs5500-project-server.herokuapp.com/api/auth"
    }
});

const MOCK_USER = {
    username: "only for test",
    password: "haha"
}
const ANOTHER_MOCK_USER = {
    username: "another only for test",
    password: "haha"
}

test("find all users", async () => {
    const users = await userServices.findAllUsers();
    expect(users.length).toBeGreaterThan(0);
})

describe("login as normal user", () => {

    let mockUser = {};
    let anotherUser = {};

    beforeAll(async () => {
        mockUser = await authServices.register(MOCK_USER);
    })

    afterAll(async () => {
        await authServices.login({username: "admin", password: "admin"});
        await userServices.deleteUser(mockUser._id);
        if (anotherUser._id) {
            await userServices.deleteUser(anotherUser._id);
        }
        await authServices.logout();
    })

    test("find user by id", async () => {
        const targetUser = await userServices.findUserById(mockUser._id);
        expect(targetUser._id).toBe(mockUser._id);
    })

    test("normal user cannot create user", async () => {
        const loggedInUser = await authServices.profile();
        expect(loggedInUser.username).toBe(mockUser.username);
        const createUser = async () => {
            await userServices.createUser(
                {username: "try create a user", password: "haha"});
        }
        await expect(createUser).rejects.toThrow();
    })

    test("normal user cannot delete user", async () => {
        const loggedInUser = await authServices.profile();
        expect(loggedInUser.username).toBe(mockUser.username);
        const deleteUser = async () => {
            await userServices.deleteUser(mockUser._id);
        }
        await expect(deleteUser).rejects.toThrow();
    })

    test("normal user can update self", async () => {
        const loggedInUser = await authServices.profile();
        expect(loggedInUser.username).toBe(mockUser.username);

        expect(mockUser.firstName).toBeFalsy();
        expect(mockUser.lastName).toBeFalsy();
        await userServices.updateUser(MY,
            {firstName: "Hey", lastName: "You"});
        mockUser = await findUserById(mockUser._id);
        expect(mockUser.firstName).toBe("Hey");
        expect(mockUser.lastName).toBe("You");
    })

    test("when a normal user wants to update another user, only himself will be updated", async () => {
        anotherUser = await authServices.register(ANOTHER_MOCK_USER);
        await authServices.logout();
        await authServices.login(MOCK_USER);

        const loggedInUser = await authServices.profile();
        expect(loggedInUser.username).toBe(mockUser.username);

        expect(anotherUser.firstName).toBeFalsy();
        expect(anotherUser.lastName).toBeFalsy();
        await userServices.updateUser(anotherUser._id, {firstName: "Hey", lastName: "You"});

        mockUser = await findUserById(mockUser._id);
        anotherUser = await findUserById(anotherUser._id);
        expect(mockUser.firstName).toBe("Hey");
        expect(mockUser.lastName).toBe("You");
        expect(anotherUser.firstName).toBeFalsy();
        expect(anotherUser.lastName).toBeFalsy();
    })
})

describe("login as admin", () => {

    beforeAll(async () => {
        await authServices.login({username: "admin", password: "admin"});
    })

    afterAll(async () => {
        await authServices.logout();
    })

    test("admin can create/delete user", async () => {
        let mockUser = await userServices.createUser(MOCK_USER);
        expect(mockUser.username).toBe(MOCK_USER.username);

        await userServices.deleteUser(mockUser._id)
        expect(await userServices.findUserById(mockUser._id)).toBeFalsy();
    })
    test("admin can update user", async () => {
        let mockUser = await userServices.createUser(MOCK_USER);

        expect(mockUser.firstName).toBeFalsy();
        await userServices.updateUser(mockUser._id, {firstName: "Hey"});
        mockUser = await userServices.findUserById(mockUser._id);
        expect(mockUser.firstName).toBe("Hey");

        await userServices.deleteUser(mockUser._id)
    })
})