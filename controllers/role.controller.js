const asyncWrapper = require("../util/asyncWrapper");
const Role = require('../model/role');
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");
const { createCustomError } = require("../errors/customAPIError");
const APIFeatures = require("../util/APIfeature");
const createRole = asyncWrapper(async (req,res,next)=>{
    try{
        const name = req.body.name;
        const isExist = await Role.findOne({name:name}).select("_id name created_at updated_at");
        if(isExist){
            const message = "Name is already Present";
            return next(createCustomError(message, 406));
        }
        const data = await Role.create({name:name})
        res.json(sendSuccessApiResponse(data));
    }
    catch(err) {
        return next(createCustomError(err,400));
    }
})
const getAllrole =  asyncWrapper(async (req,res,next)=>{
    try{
        const total = await Role.countDocuments();
        const {
            query,
            page:page,
            limit:limit,
        } = new APIFeatures(Role.find(),req.query)
        .page();
        const data = await query.query;
        res.json(sendSuccessApiResponse(data,{
            "total":total,
            "pages":limit,
            "page":page
        }));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
})
module.exports = {createRole, getAllrole}