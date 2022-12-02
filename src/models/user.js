const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('The password cannot include the word "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Must be 18 or over.')
            }
        }
    },
    tokens: [{
        token:  {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})


userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})  



//static methods available on the model, sometimes called model methods
// .methods available on the instance, sometimes called instance methods
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

// method on User to match password and email for login
userSchema.methods.generateAuthToken = async function() {
    const user = this // this is the instance 
    const token = jwt.sign({_id: user.id.toString()}, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token;
}

//static methods available on the model// .methods availbe on instance
// method on User to match password and email for login
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email})
    if(!user){
        throw new Error('Unable to log in.')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to log in.')
    }

    return user;
}

// HASH PLAIN-TEXT PASSWORD BEFORE SAVING
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

// DELETE TASKS WHEN USER IS REMOVED
userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)




module.exports = User;