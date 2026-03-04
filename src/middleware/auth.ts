import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../models/role'; // Assuming you have a role model

const authMiddleware = (roles: Role[] = []) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) return res.status(401).send('Access denied. No token provided.');

        jwt.verify(token, process.env.JWT_SECRET_KEY || 'your_secret', (err, decoded) => {
            if (err) return res.status(403).send('Invalid token.');
            req.user = decoded;
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).send('Access denied.');
            }
            next();
        });
    };
};

export default authMiddleware;
