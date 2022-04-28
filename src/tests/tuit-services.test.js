import * as tuitServices from "../services/tuits-service";

jest.setTimeout(10000);

jest.mock("../services/utils.js", () => {
    return {
        TUITS_API: "https://cs5500-project-server.herokuapp.com/api/tuits",
        USERS_API: "https://cs5500-project-server.herokuapp.com/api/users",
        AUTH_API: "https://cs5500-project-server.herokuapp.com/api/auth"
    }
});

test("find all tuits", async () => {
    const tuits = await tuitServices.findAllTuits();
    expect(tuits.length).toBeGreaterThan(0);
})


