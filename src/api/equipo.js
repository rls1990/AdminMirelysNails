/* eslint-disable no-undef */
import axios from "./axios";

export const list = () => axios.get("/equipo");

export const getById = (id) => axios.get(`/equipo/${id}`);

export const create = (item) => axios.post("/equipo", item);

export const update = (id, item) => axios.put(`/equipo/${id}`, item);

export const deleteS = (id) => axios.delete(`/equipo/${id}`);
