const { createCustomError } = require("../errors/customAPIError");
const { sendSuccessApiResponse } = require("../middleware/successApiResponse");
const community = require("../model/community");
const Role = require("../model/role");
const Member = require("../model/member");
const APIFeatures = require("../util/APIfeature");
const asyncWrapper = require("../util/asyncWrapper");

function slugify(str){
    return str.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '_')
    .replace(/^-+|-+$/g, '');
}

const createCommunity = asyncWrapper(async (req,res,next)=>{
    try{
        const name = req.body.name;
        const slug = slugify(name); 
        const data = await community.create({
            name:name,
            slug:slug,
            owner:req.user.userId
        })
        if(data){
            let giveRole = await Role.findOne({name:'Community Admin'})
            if(!giveRole) giveRole = await Role.create({name:'Community Admin'})
            await Member.create({
                community:data._id,
                user:req.user.userId,
                role:giveRole._id
            }) 
        }
        res.json(sendSuccessApiResponse(data))
    }
    catch(err){
        return next(createCustomError(err,400));
    }
})
const getCommunity = asyncWrapper(async (req,res,next)=>{
    try{
        const total = await community.countDocuments();
        const {
            query,
            page:page,
            limit:limit,
        } = new APIFeatures(community.find().populate('owner','_id name'),req.query)
        .page()
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
const getCommunityMember = asyncWrapper(async (req,res,next)=>{
    try{
        const result = await community.findOne({slug:req.params.id});
        const total = await Member.countDocuments({community:result._id});
        const {
            query,
            page:page,
            limit:limit,
        } = new APIFeatures(Member.find({community:result._id}).populate('user','_id name').populate('role','_id name'),req.query)
        .page()
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

const myOwnCommunity = asyncWrapper(async (req,res,next)=>{
    try{
        const total = await community.countDocuments({owner:req.user.userId});
        const {
            query,
            page:page,
            limit:limit,
        } = new APIFeatures(community.find({owner:req.user.userId}),req.query)
        .page()
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
module.exports = {createCommunity,getCommunity , getCommunityMember, myOwnCommunity}