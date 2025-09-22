// middlewares/verifyOneTimeToken.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import redis from "../utils/redisClient";

const { jwtActivationKey, jwtAccessKey } = require('../secret')


export const verifyOneTimeToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token =
            req.headers.authorization?.split(" ")[1] ||
            req.body.token || req.query.token;


        if (!token) return res.status(401).json({ message: "No token provided" });

        // Check Redis for valid token
        const exists = await redis.get(`token:${token}`);
        if (!exists) return res.status(403).json({ message: "Token expired or already used" });

        // Delete from Redis to invalidate
        await redis.del(`token:${token}`);

        // const decoded = jwt.verify(token, jwtActivationKey);

        // (req as any).user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
