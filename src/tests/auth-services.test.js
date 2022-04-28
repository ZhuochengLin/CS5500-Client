import * as authServices from "../services/auth-service";
import * as userServices from "../services/users-service";

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

test("register", async () => {
    let mockUser = await authServices.register(MOCK_USER);
    expect(mockUser.username).toBe(MOCK_USER.username);

    await authServices.login({username: "admin", password: "admin"});
    await userServices.deleteUser(mockUser._id);
})

test("login successfully", async () => {
    let mockUser = await authServices.register(MOCK_USER);
    expect(mockUser.username).toBe(MOCK_USER.username);
    await authServices.logout();

    await expect(authServices.profile).rejects.toThrow();
    await authServices.login(MOCK_USER);
    const profile = await authServices.profile();
    expect(profile.username).toBe(MOCK_USER.username);

    await authServices.login({username: "admin", password: "admin"});
    await userServices.deleteUser(mockUser._id);
})

test("login failed", async () => {
    let mockUser = await authServices.register(MOCK_USER);
    expect(mockUser.username).toBe(MOCK_USER.username);
    await authServices.logout();

    const loginWithWrongPassword = async () => {
        await authServices.login({...MOCK_USER, password: "xxx"});
    }
    await expect(loginWithWrongPassword).rejects.toThrow();

    await authServices.login({username: "admin", password: "admin"});
    await userServices.deleteUser(mockUser._id);
})

test("logout", async () => {
    let mockUser = await authServices.register(MOCK_USER);
    expect(mockUser.username).toBe(MOCK_USER.username);
    await authServices.logout();

    await expect(authServices.profile).rejects.toThrow();

    await authServices.login({username: "admin", password: "admin"});
    await userServices.deleteUser(mockUser._id);
})

test("profile", async () => {
    let mockUser = await authServices.register(MOCK_USER);
    const profile = await authServices.profile();
    expect(profile.username).toBe(mockUser.username);

    await authServices.login({username: "admin", password: "admin"});
    await userServices.deleteUser(mockUser._id);
})