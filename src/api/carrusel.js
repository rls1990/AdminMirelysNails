/* eslint-disable no-undef */
import axios from "./axios";

export const list = () => axios.get("/carruselhome");

export const getById = (id) => axios.get(`/carruselhome/${id}`);

export const create = (item) => axios.post("/carruselhome", item);

export const update = (id, item) => axios.put(`/carruselhome/${id}`, item);

export const deleteS = (id) => axios.delete(`/carruselhome/${id}`);
