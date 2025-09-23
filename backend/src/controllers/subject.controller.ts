import Subject from "../models/Subject";
import { Request,Response } from "express";

export const createSubject = async (req:Request,res:Response)=>{
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
    console.log("Subject added:", subject)
}

export const getSubject = async (req: Request,res:Response)=>{
    const {subjectID} = req.params;
    res.status(201).json(subjectID);
    console.log("Subject", subjectID)
}