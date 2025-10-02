import Subject from "../models/Subject";
import { Request,Response } from "express";

// Create Subject
export const createSubject = async (req:Request,res:Response)=>{
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
    console.log("Subject added:", subject)
}

//Get All Subject
export const getAllSubject = async (req:Request,res:Response)=>{
    const subject = await Subject.find(req.params);
    res.status(201).json(subject);
    console.log("All Subject", subject)
}
// Sunject By ID
export const getSubject = async (req: Request,res:Response)=>{
    const {subjectID} = req.params;
    res.status(201).json(subjectID);
    console.log("Subject", subjectID)
}