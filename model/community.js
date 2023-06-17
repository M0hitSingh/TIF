const mongoose = require("mongoose")
const schema = mongoose.Schema;
const {Snowflake} = require('@theinternetfolks/snowflake')
function generatedId(){
    return  Snowflake.generate();
}
const cummunitySchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: generatedId
        },
        name:{
            type:String,
            require:[true,'Please Enter the name of community'],
            min: [3, "Name should be of atleast 2 alphabets"],
        },
        slug:{
            type:String,
            unique:[true,'This Slug is Already Present']
        },
        owner:{
            type:String,
            ref:'user'
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

module.exports = mongoose.model("community", cummunitySchema, "community");
