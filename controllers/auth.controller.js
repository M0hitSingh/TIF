const asyncWrapper = require("../util/asyncWrapper");
const User = require("../model/user")

const {createCustomError} = require('../errors/customAPIError')
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");

const signup = asyncWrapper(async (req,res,next)=>{
    try{
        const { name, email, password } = req.body;
        const emailExists = await User.findOne({ email, isActive: true , isVerified:true});
        if (emailExists) {
            const message = "Email is already registered";
            return next(createCustomError(message, 406));
        }
        const user = await User.create(req.body);
        const data = {user,token: user.generateJWT()} 
        res.json(sendSuccessApiResponse(data,201));
    }
    catch(err){
        console.log(err)
        return createCustomError(err,400);
    }
})

const login = asyncWrapper(async (req,res,next)=>{
    try{
        const { email, password } = req.body;
        const emailExists = await User.findOne({ email});
        if (!emailExists) {
            const message = "Email Not Exist";
            return next(createCustomError(message, 401));
        }   
        const isPasswordRight = await emailExists.comparePassword(password);
        if (!isPasswordRight) {
            const message = "Invalid credentials";
            return next(createCustomError(message, 401));
        }
    
        const data = {
            name: emailExists.name,
            email: emailExists.email,
            token: emailExists.generateJWT(),
        };
        res.status(200).json(sendSuccessApiResponse(data));
    }
    catch(err){
        return createCustomError(err,400);
    }
})


module.exports = {
    login,
    signup
}