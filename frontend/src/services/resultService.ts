import axios from "axios";
import type{ IResult } from "../type/result";

const BASE_URL = "/results";

export const fetchResults = () => axios.get<IResult[]>(BASE_URL);
export const fetchResultById = (id: string) => axios.get<IResult>(`${BASE_URL}/${id}`);
export const createResult = (data: Partial<IResult>) => axios.post<IResult>(BASE_URL, data);
export const updateResult = (id: string, data: Partial<IResult>) => axios.put<IResult>(`${BASE_URL}/${id}`, data);
export const deleteResult = (id: string) => axios.delete(`${BASE_URL}/${id}`);