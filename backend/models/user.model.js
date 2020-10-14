const mongoose = require('mongoose'); // Erase if already required
const beautifyUnique = require('mongoose-beautiful-unique-validation');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    salt:{
        type:String,
        required:true
    },
    hash:{
        type:String,
        required:true
    },
    dateCreated:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateModified:{
        type:Date,
        required:true,
        default:Date.now
    },
    name:{
        type:String,
    },
    mobile:{
        type:String,
        index: {
            unique:true,
            sparse:true,
        },
    },
    address:{
        type:String
    }
});

userSchema.plugin(beautifyUnique);

//Export the model
module.exports = mongoose.model('User', userSchema);