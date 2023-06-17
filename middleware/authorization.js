const express = require('express')
const jwt = require('jsonwebtoken')
const { createCustomError } =  require("../errors/customAPIError");
const User =  require('../model/user');

const authorization = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        const message = "Unauthenticaded No Bearer";
        return next(createCustomError(message, 401));
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload =await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: payload.userId});
        if (!user) {
            return next(createCustomError("Invalid JWT"));
        } 
        else  {
            req.user = { userId: payload.userId, details: user };
        }
        next();
    } catch (error) {
        let message;
        let err
        if (error instanceof jwt.TokenExpiredError) {
            message = "Token Expired";

        } else {
            message = "Authentication failed invalid JWT";
        }

        return next(createCustomError(message, 401));
    }
};


module.exports = { authorization};
