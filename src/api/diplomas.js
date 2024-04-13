/* eslint-disable no-undef */
import axios from "./axios";

export const list = () => axios.get("/diploma");

export const getById = (id) => axios.get(`/diploma/${id}`);

export const create = (diploma) => axios.post("/diploma", diploma);

export const update = (id, diploma) => axios.put(`/diploma/${id}`, diploma);

export const deleteS = (id) => axios.delete(`/diploma/${id}`);
