const mongoose = require("mongoose");
const {Snowflake} = require('@theinternetfolks/snowflake')

const memberSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default:Snowflake.generate(),
        },
        community: {
            type: String,
            ref:'community._id'
        },
        user:{
            type:String,
            ref:'user._id'
        },
        role: {
            type: String,
            ref:'role._id'
        },
        createdAt: { 
            type: Date,
            default: Date.now 
        },
    }
);

module.exports = mongoose.model("member", memberSchema, "member");
