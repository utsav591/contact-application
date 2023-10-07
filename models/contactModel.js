import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    profile:{
        type: String,
    },
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
    },
    number:{
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
    },
    address:{
        type: String,
    },
    qrcode:{
        type: String,  
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
})

const Contact = mongoose.model("Contact", contactSchema)


export default Contact;