const mongoose=require('mongoose');

const medicoSchema=new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    TP:{
        type: Number,
        required:true
    },
    especialidad:{
        type: String,
        default: "Médico General"
    }    
},{timestamps:true});
const Medicos=mongoose.model('Medicos', medicoSchema);
module.exports={Medicos}