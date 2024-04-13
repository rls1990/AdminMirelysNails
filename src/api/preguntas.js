/* eslint-disable no-undef */
import axios from "./axios";

export const list = () => axios.get("/preguntas");

export const getById = (id) => axios.get(`/preguntas/${id}`);

export const create = (item) => axios.post("/preguntas", item);

export const update = (id, item) => axios.put(`/preguntas/${id}`, item);

export const deleteS = (id) => axios.delete(`/preguntas/${id}`);
