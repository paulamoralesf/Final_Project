const mongoose=require('mongoose');

const farmacosSchema=new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    presentacion:{
        type:String
    }
    
},{timestamps:true});
const Farmacos=mongoose.model('Farmacos', farmacosSchema);
module.exports={Farmacos}