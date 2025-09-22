import { Request, Response, NextFunction } from "express";
import { createJSONWebToken } from "../utils/jsonWebToken";
import User from '../models/users';
const createError = require('http-errors');

const jwt = require('jsonwebtoken');
const { jwtAccessKey, jwtRefreshKey } = require('../secret')

const { findWithId } = require('../utils/findWithId');
const { successResponse } = require('../utils/reponseController');

 
export const isLoggedIn = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const token = req.cookies.accessToken;
        if(!token){
            throw createError(404, 'You are alrady logged out');
        }
        const decodedToken = jwt.verify(token, jwtAccessKey);
        if(!decodedToken){
            throw createError(404, 'Invalid Access,Please login again');
        }
        const id = decodedToken.id;
        const user = await findWithId(User, id);

        req.user = user;
        // console.log(req.user)
        next();

    } catch (error) {
        return next(error);
    }
}

export const isLoggedOut = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const token = req.cookies.accessToken;
        if(token){
            throw createError(400, 'You are already logged in');
        }
        next();

    } catch (error) {
        return next(error);
    }
}

export const isAdmin = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        
        if(req.user.role !== "Admin"){
            throw createError(403, 'Forbidden. You  must be an admin to access this resource');
        }
        next();

    } catch (error) {
        return next(error);
    }
}

export const isHR = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        
        if(req.user.role !== "HR"){
            throw createError(403, 'Forbidden. You  must be an HR to access this resource');
        }
        next();

    } catch (error) {
        return next(error);
    } 
}

export const isTeamLead = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        
        if(req.user.role !== "TeamLead"){
            throw createError(403, 'Forbidden. You  must be an Team Leader to access this resource');
        }
        next();

    } catch (error) {
        return next(error);
    }
}



// Accepts a list of roles that are allowed to access the route
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRole = req.user?.role;

      if (!allowedRoles.includes(userRole)) {
        throw createError(403, `Forbidden. You must be one of [${allowedRoles.join(", ")}] to access this resource`);
      }

      next();
    } catch (error) {
      return next(error);
    }
  };
};

export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        const decodedToken = jwt.verify(oldRefreshToken, jwtRefreshKey);
        if (!decodedToken) {
            throw createError(401, "Please login again")
        }

        const accessToken = createJSONWebToken(decodedToken.user, jwtAccessKey, '5m');

        res.cookie('accessToken', accessToken, {
            maxAge: 5 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',

        });

        //Success Response 
        return successResponse(res, {
            statusCode: 200,
            message: 'New access token is generated',
            payload: { },
        });
    } catch (error) {
        next(error);
    }
}



