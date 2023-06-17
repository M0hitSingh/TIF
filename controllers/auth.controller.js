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
        const response = {
            _id:user._id,
            name:user.name,
            email:user.name,
            created_at:user.created_at
        }
        res.json(sendSuccessApiResponse(response,{"access_token":user.generateJWT()}));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
})

const login = asyncWrapper(async (req,res,next)=>{
    try{
        const { email, password } = req.body;
        const emailExists = await User.findOne({email:email});
        if (!emailExists) {
            const message = "Email Not Exist";
            return next(createCustomError(message, 401));
        }   
        const isPasswordRight = await emailExists.comparePassword(password);
        if (!isPasswordRight) {
            const message = "Invalid credentials";
            return next(createCustomError(message, 401));
        }
        const data = await User.findById(emailExists._id).select("_id name email created_at");
        res.json(sendSuccessApiResponse(data,{"access_token":data.generateJWT()}));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
})

const getMe = asyncWrapper(async (req,res,next)=>{
    try{
        const userId = req.user.userId;
        const isUser = await User.findById(userId).select("_id name email created_at");
        return res.json(sendSuccessApiResponse(isUser));
    }
    catch(err){
        return next(createCustomError(err,400))
    }
})


module.exports = {
    login,
    signup,
    getMe
}