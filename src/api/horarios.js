/* eslint-disable no-undef */
import axios from "./axios";

export const list = () => axios.get("/horarios");

export const getById = (id) => axios.get(`/horarios/${id}`);

export const create = (horario) => axios.post("/horarios", horario);

export const update = (id, horario) => axios.put(`/horarios/${id}`, horario);

export const deleteS = (id) => axios.delete(`/horarios/${id}`);
