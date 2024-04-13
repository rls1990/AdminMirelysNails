/* eslint-disable no-undef */
import axios from "./axios";

export const list = () => axios.get("/servicios");

export const getById = (id) => axios.get(`/servicios/${id}`);

export const create = (servicio) => axios.post("/servicios", servicio);

export const update = (id, servicio) => axios.put(`/servicios/${id}`, servicio);

export const deleteS = (id) => axios.delete(`/servicios/${id}`);
