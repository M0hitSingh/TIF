const mongoose = require("mongoose")
const schema = mongoose.Schema;
const {Snowflake} = require('@theinternetfolks/snowflake')

const cummunitySchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default:Snowflake.generate(),
        },
        name:{
            type:String,
            require:[true,'Please Enter the name of community']
        },
        slug:{
            type:String,
            unique:[true,'This Slug is Already Present']
        },
        owner:{
            type:String,
            ref:'user._id'
        },
        created_at:{
            type:Date,
            default: Date.now 
        },
        updated_at:{
            type:Date,
            default: Date.now
        },
    }
);

module.exports = mongoose.model("cummunity", cummunitySchema, "cummunnity");
