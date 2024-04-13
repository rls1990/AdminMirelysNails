/* eslint-disable no-undef */
import axios from "./axios";

export const list = () => axios.get("/precios");

export const getById = (id) => axios.get(`/precios/${id}`);

export const create = (precio) => axios.post("/precios", precio);

export const update = (id, precio) => axios.put(`/precios/${id}`, precio);

export const deleteS = (id) => axios.delete(`/precios/${id}`);
