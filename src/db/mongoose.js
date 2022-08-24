const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager-api";
mongoose.connect(connectionURL + '/' + databaseName)

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
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
    }
})

const Task = mongoose.model('Task', {
    task: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const newTask = new Task({
    task: 'Leg exercises',
    completed: false
})

const me = new User({
    name: 'Johnny ',
    email: 'tFADart@gmail.com',
    // age: 
})

// newTask.save().then(() => {
//     console.log(newTask)
// }).catch((error) => {
//     console.log(error)
// })

me.save().then(() => {  // we could put the me in the .then callback, but we already have access to it.
    console.log(me)
}).catch((error) => {
    console.log('error', error)
})