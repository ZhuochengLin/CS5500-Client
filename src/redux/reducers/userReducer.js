import {LOG_IN, LOG_OUT} from "../actionTypes";

const initialState = {
    loggedIn: false,
    username: null,
    userId: null,
    profile: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            const {username, userId, profile} = action.user;
            return {...state, loggedIn: true, username: username, userId: userId, profile: profile};
        case LOG_OUT:
            return {...state, loggedIn: false, username: null, userId: null, profile: null};
        default:
            return state;
    }
}
export default userReducer;