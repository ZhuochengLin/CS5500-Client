import * as tuitServices from "../services/tuits-service";
import * as userServices from "../services/users-service";
import * as authServices from "../services/auth-service";

jest.setTimeout(10000);

jest.mock("../services/utils.js", () => {
    return {
        TUITS_API: "https://cs5500-project-server.herokuapp.com/api/tuits",
        USERS_API: "https://cs5500-project-server.herokuapp.com/api/users",
        AUTH_API: "https://cs5500-project-server.herokuapp.com/api/auth"
    }
});

const MOCK_USER = {
    username: "testUser",
    password: "test"
}

describe("createTuit", () => {
    let testUser = {};
    let testTuit = {
        tuit: "Hello!"
    };

    beforeAll(async () => {
        testUser = await authServices.register(MOCK_USER);
    })

    afterAll(async () => {
        await tuitServices.deleteTuit(testTuit._id);
        await authServices.login({ username: "admin", password: "admin" });
        await userServices.deleteUser(testUser._id);
        await authServices.logout();
    })

    test("create tuits", async () => {
        testTuit = await tuitServices.createTuit(testUser._id, testTuit);
        const insertedTuit = await tuitServices.findTuitById(testTuit._id);
        expect(insertedTuit.tuit).toEqual(testTuit.tuit);
    });
});

describe("findTuitById", () => {
    let testUser = {};
    let testTuit = {
        tuit: "Hello World!"
    };

    beforeAll(async () => {
        testUser = await authServices.register(MOCK_USER);
        testTuit = await tuitServices.createTuit(testUser._id, testTuit);
    })

    afterAll(async () => {
        await tuitServices.deleteTuit(testTuit._id);
        await authServices.login({ username: "admin", password: "admin" });
        await userServices.deleteUser(testUser._id);
        await authServices.logout();
    })

    test("find a tuit by id", async () => {
        const insertedTuit = await tuitServices.findTuitById(testTuit._id);
        expect(insertedTuit._id).toEqual(testTuit._id);
        expect(insertedTuit.tuit).toEqual(testTuit.tuit);
    })
});

describe("findTuits", () => {
    let mockUser = {};
    let testTuits = [
        "Today", "is", "a", "good", "day"
    ];

    beforeAll(async () => {
        mockUser = await authServices.register(MOCK_USER);
        await Promise.all(testTuits.map(tuit => tuitServices.createTuit(mockUser._id, { tuit: tuit })));
    })

    afterAll(async () => {
        const insertedTuits = await tuitServices.findTuitByUser(mockUser._id);
        await Promise.all(insertedTuits.map(tuit => tuitServices.deleteTuit(tuit._id)))
        await authServices.login({ username: "admin", password: "admin" });
        await userServices.deleteUser(mockUser._id);
        await authServices.logout();
    })

    test("find all tuits", async () => {
        const allTuits = await tuitServices.findAllTuits();
        expect(allTuits.length).toBeGreaterThanOrEqual(testTuits.length);

        // test tuits exist in all tuits
        const mockTuits = allTuits.filter(tuit => testTuits.indexOf(tuit.tuit) >= 0);
        expect(mockTuits.length).toEqual(testTuits.length);

        // verify each test tuit content
        testTuits.forEach(tuitContent => {
            const insertedOne = mockTuits.find(tuit => tuit.tuit === tuitContent);
            expect(insertedOne.postedBy._id).toEqual(mockUser._id);
        })
    })

    test("find tuits by user", async () => {
        // user info will be populated
        const insertedTuits = await tuitServices.findTuitByUser(mockUser._id);
        // check tuit belongs to the user
        testTuits.forEach(tuitContent => {
            const insertedOne = insertedTuits.find(tuit => tuit.tuit === tuitContent);
            expect(insertedOne.postedBy.username).toEqual(mockUser.username);
        });
    });
})

describe("updateTuit", () => {
    let testUser = {};
    let testTuit = {
        tuit: "Hi World!"
    };

    beforeAll(async () => {
        testUser = await authServices.register(MOCK_USER);
        testTuit = await tuitServices.createTuit(testUser._id, testTuit);
    })

    afterAll(async () => {
        await tuitServices.deleteTuit(testTuit._id);
        await authServices.login({ username: "admin", password: "admin" });
        await userServices.deleteUser(testUser._id);
        await authServices.logout();
    })

    test("can update tuit with REST API", async () => {
        let insertedTuit = await tuitServices.findTuitById(testTuit._id);
        expect(insertedTuit.tuit).toEqual(testTuit.tuit);

        const newContent = "brand new";
        await tuitServices.updateTuit(testUser._id, insertedTuit._id, { tuit: newContent });
        insertedTuit = await tuitServices.findTuitById(testTuit._id);
        expect(insertedTuit.tuit).toEqual(newContent);
    });
});

describe("deleteTuit", () => {
    let testUser = {};
    let testTuit = {
        tuit: "Hello Hello!"
    };

    beforeAll(async () => {
        testUser = await authServices.register(MOCK_USER);
    })

    afterAll(async () => {
        await authServices.login({ username: "admin", password: "admin" });
        await userServices.deleteUser(testUser._id);
        await authServices.logout();
    })

    test("can delete tuit with REST API", async () => {
        testTuit = await tuitServices.createTuit(testUser._id, testTuit);
        let userTuits = await tuitServices.findTuitByUser(testUser._id);
        expect(userTuits.length).toEqual(1);

        const status = await tuitServices.deleteTuit(testTuit._id);
        expect(status.deletedCount).toEqual(1);
        userTuits = await tuitServices.findTuitByUser(testUser._id);
        expect(userTuits.length).toEqual(0);
    });
});





