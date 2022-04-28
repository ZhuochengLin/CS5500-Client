import axios from "axios";
import {USERS_API} from "./utils";

const api = axios.create({
  withCredentials: true
});

export const createUser = (user) =>
    api.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = () =>
    api.get(USERS_API)
        .then(response => response.data);

export const findUserById = (uid) =>
    api.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const deleteUser = (uid) =>
    api.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
    api.get(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

export const updateUser = (uid, user) =>
    api.put(`${USERS_API}/${uid}`, user)
        .then(response => response.data);