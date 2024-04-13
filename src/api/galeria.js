/* eslint-disable no-undef */
import axios from "./axios";

export const list = () => axios.get("/galeria");

export const getById = (id) => axios.get(`/galeria/${id}`);

export const getImageById = (id) => axios.get(`/galeria/${id}/${Date.now()}`);

export const create = (galeria) => axios.post("/galeria", galeria);

export const update = (id, galeria) => axios.put(`/galeria/${id}`, galeria);

export const deleteS = (id) => axios.delete(`/galeria/${id}`);
