const mongoose = require("mongoose")
const {Snowflake} = require('@theinternetfolks/snowflake')
const roleSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default:Snowflake.generate(),
        },
        name:{
            type: String,
            unique:true,
            required: [true, "Please provide your Role Name"],
            trim: true,
        },
        createdAt: { 
            type: Date,
            default: Date.now 
        },
        updated_at:{
            type:Date,
            default: Date.now
        },
    }
);

module.exports = mongoose.model("role", roleSchema, "role");
