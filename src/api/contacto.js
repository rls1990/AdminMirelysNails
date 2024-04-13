/* eslint-disable no-undef */
import axios from "./axios";

export const list = () => axios.get("/contacto");

export const getById = (id) => axios.get(`/contacto/${id}`);

export const create = (item) => axios.post("/contacto", item);

export const update = (id, item) => axios.put(`/contacto/${id}`, item);

export const deleteS = (id) => axios.delete(`/contacto/${id}`);
