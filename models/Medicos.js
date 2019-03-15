const mongoose=require('mongoose');

const medicoSchema=new mongoose.Schema({
    foto:{
        type:String,
        default:"https://png.pngtree.com/element_origin_min_pic/17/08/28/fe620dddf5de38d32c98aa33b5e13a26.jpg"
    },
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