const { createCustomError } = require("../errors/customAPIError");
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");
const Community = require("../model/community");
const member = require("../model/member");
const asyncWrapper = require("../util/asyncWrapper");

const addMember = asyncWrapper (async(req,res,next)=>{
    try{
        const communityId = req.body.community;
        const userId = req.body.user;
        const roleId = req.body.role
        const isOwner = await Community.findById(communityId);
        console.log(isOwner)
        if(!isOwner){
            return next(createCustomError("No Community Exist",404));
        }
        else if(isOwner.owner !== req.user.userId){
            return next(createCustomError('NOT_ALLOWED_ACCESS',401));
        }
        const isPresent = await member.findOne({community:communityId,user:userId})
        if(isPresent) return next(createCustomError("Member ALready present in Community",301));
        const result = await member.create({
            community:communityId,
            user:userId,
            role:roleId
        })
        res.json(sendSuccessApiResponse(result));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
})

const removeMember = asyncWrapper (async(req,res,next)=>{
    try{
        const isMember = await member.findById(req.params.id)
        if(!isMember){
            return next(createCustomError("Member Not Exist",404));
        }
        const isEligible = await member.findOne({community:isMember.community,user:req.user.userId}).populate('role','name')
        console.log(isMember.community)
        // console.log(req)
        if(isEligible && (isEligible.role.name == 'Community Admin' || isEligible.role.name =='Community Moderator')){
            await member.deleteOne({_id:req.params.id});
            res.json({"status":true});
        }
        else return next(createCustomError('NOT_ALLOWED_ACCESS',401));
    }
    catch(err){
        return next(createCustomError(err,400));
    }
})

module.exports = {addMember, removeMember}