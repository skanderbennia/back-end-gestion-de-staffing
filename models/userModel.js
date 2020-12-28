const mongoose = require("mongoose")
const slugify = require("slugify")
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    nom:{
        type:String,
        trim:true,
        //required:[true,'vous devez entrer le nom']
    },
    slug:String,
    prenom:{
        type: String,
        trim:true,
        //required:[true,'vous devez entre le prenom']
    },
    email:{
        type:String,
        //required:[true,'vous de vez entrez l email'],
        lowercase:true,
        validate:{
            validator:function(v){
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
       
    },
    password:{
        type:String,
        //required:[true,'vous devez entre le mot de passe']
        minlength:8,
        select:false
        
    },
    passwordConfirmation:{
        type:String,
        //required:[true,"il faut entrer la confirmation de mot de passe"]
        // select:false
         validate:{
             validator: function(el){
                console.log(el,"  ",this.password)
                 return el === this.password
                 
             },
             message:'this is not a valid confirmation'
         }
    },
    age:{
        type:Number,
        //required:[true,'vous devez entre l age']
    },
    specialite:{
        type:String,
        trim:true
    },
    photoProfil:{
        type:String,
        trim:true
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    secretPeople:{
        type:Boolean,
        default:false
    }
    
    //im making test here but this schema need to be heavy

    
},{
    //this mean if you have virual you will convert it from a Json in the inupt to object 
    toJson:{virtuals:true},
    toObject:{virtuals:true}
})
//if you have a duration and you want to convert to a value you can create a virtual property
// userSchema.virtual('durationWeeks').get(function(){
//     return this .createdAt/7
// })

//middleware in mongoose who run before saving(save(),create()) a document

// userSchema.pre('save',function(next){
//     this.slug = slugify(this.nom,{lower:true})
//     next()
// })

// userSchema.post('save',function(doc,next){
//     console.log(doc)
//     next()
// })
//QUERY MIDDLEWARE:(HOOKS)
//find people who is not secret in the data
//we did a regular expression on find so we can use it on find and other method that start with find
userSchema.pre('/^find/',function(next){
    this.find({secretPeople:{$ne:'true'}})
    next()
})
// userSchema.path('email').validate(function (email) {
//     var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
//     return emailRegex.test(email); // Assuming email has a text attribute
//  }, 'The e-mail field cannot be empty.')


userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next()
    //bcrypt libary is used to encrypt the password
    this.password = await bcrypt.hash(this.password,12)
    //after we add the password and confirmed it you need to delete it
    this.passwordConfirmation = undefined;
    next()
})
//this function help us to compare the encrypted password and the no encrypted password
userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

const User = mongoose.model('User',userSchema)
module.exports = User