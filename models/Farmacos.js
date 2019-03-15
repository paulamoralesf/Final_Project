const mongoose=require('mongoose');

const farmacosSchema=new mongoose.Schema({
    imagen:{
        type:String,
        default:"https://5.imimg.com/data5/TY/JS/MY-35615337/fever-allopathic-medicine-500x500.jpg"
    },
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