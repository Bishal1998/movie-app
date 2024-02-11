import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'
import asyncHandler from './asyncHandler.js';

//To check whether user is authenticated or not

const authenticated = asyncHandler(async (req, res, next) => {

    let token = req.coookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password")
            next();

        } catch (error) {
            res.status(401)
            throw new Error("You are not authorized, token failed")
        }
    } else {
        res.status(401)
        throw new Error("You are not authorized, token not found")
    }
})

//To check whether the person is admin or not

const authorized = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401)
        throw new Error("You are not authorized as an admin");
    }
})

export { authorized, authenticated }