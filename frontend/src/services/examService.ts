import axios from 'axios';
import { IExam } from '../interfaces/exam';

const API = 'http://localhost:5000/exams';

export const getExams = async (): Promise<IExam[]> => {
  const res = await axios.get(API);
  return res.data;
};

export const getExamById = async (id: string): Promise<IExam> => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const createExam = async (exam: Partial<IExam>) => {
  const res = await axios.post(API, exam);
  return res.data;
};

export const updateExam = async (id: string, exam: Partial<IExam>) => {
  const res = await axios.put(`${API}/${id}`, exam);
  return res.data;
};