const mongoose = require("mongoose")
const {Snowflake} = require('@theinternetfolks/snowflake')
function generatedId(){
    return  Snowflake.generate();
}
const roleSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default:generatedId
        },
        name:{
            type: String,
            unique:true,
            min: [2, "Name should be of atleast 2 alphabets"],
            required: [true, "Please provide your Role Name"],
        },
        scopes:[{
            type:String
        }],
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
