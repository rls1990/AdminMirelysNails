/* eslint-disable no-undef */
import axios from "./axios";

export const list = () => axios.get("/testimonios");

export const getById = (id) => axios.get(`/testimonios/${id}`);

export const create = (item) => axios.post("/testimonios", item);

export const update = (id, item) => axios.put(`/testimonios/${id}`, item);

export const deleteS = (id) => axios.delete(`/testimonios/${id}`);
