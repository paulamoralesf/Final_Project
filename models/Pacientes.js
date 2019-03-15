const mongoose=require('mongoose');
const {farmacosSchema}=require('./Farmacos')

const pacienteSchema=new mongoose.Schema({
    foto:{
        type: String,
        default: "https://previews.123rf.com/images/stockgiu/stockgiu1705/stockgiu170507142/79062881-figura-mujer-bonita-con-haistyle-y-elegante-vestido-ilustraci%C3%B3n-vectorial.jpg"
    },
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