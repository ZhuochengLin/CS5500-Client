import axios from "axios";
import {AUTH_API} from "./utils";

const api = axios.create({
    withCredentials: true
});

export const register = (user) =>
    api.post(`${AUTH_API}/register`, user)
        .then(response => response.data);

export const login = (user) =>
    api.post(`${AUTH_API}/login`, user)
        .then(response => response.data);

export const logout = (user) =>
    api.post(`${AUTH_API}/logout`, user)
        .then(response => response.data);

export const profile = () =>
    api.post(`${AUTH_API}/profile`)
        .then(response => response.data);