/* eslint-disable no-undef */
import axios from "./axios";

export const loginRequest = (user) => axios.post(`/loginadmin`, user);

export const users = () => axios.get("/usuarios");

export const createUser = (user) => axios.post("/usuarios", user);

export const updateUser = (id, user) => axios.put(`/usuarios/${id}`, user);

export const deleteUser = (id) => axios.delete(`/usuarios/${id}`);

export const verifyTokenRequest = () => axios.get(`/verify`);

export const getById = (id) => axios.get(`/usuarios/${id}`);
