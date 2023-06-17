const mongoose = require("mongoose");
const {Snowflake} = require('@theinternetfolks/snowflake')
function generatedId(){
    return  Snowflake.generate();
}
const memberSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default:generatedId
        },
        community: {
            type: String,
            ref:'community'
        },
        user:{
            type:String,
            ref:'user'
        },
        role: {
            type: String,
            ref:'role'
        },
        createdAt: { 
            type: Date,
            default: Date.now 
        },
    }
);

module.exports = mongoose.model("member", memberSchema, "member");
