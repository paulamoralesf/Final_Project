const mongoose=require('mongoose');
const {farmacosSchema}=require('./Farmacos')

const pacienteSchema=new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    CC:{
        type: Number,
        required:true
    },
    EPS:{
        type: String,
        default: "Nueva EPS"
    }, 
    edad: Number,
    prescripciones:[{
        farmacos:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmacos'
        },
        posologia:{
            dosis:{
                type:String,
            },
            medico:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Medicos'
            }            
        }  
    }]
},{timestamps:true});
const Pacientes=mongoose.model('Pacientes', pacienteSchema);
module.exports={Pacientes}