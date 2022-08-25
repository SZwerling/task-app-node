const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager-api";
mongoose.connect(connectionURL + '/' + databaseName)



// const newTask = new Task({
//     task: ' sleep around ',
//     completed: false
// })


//      THIS LOGIC MOVED TO INDEX.JS WITH CONST USER = NEW USER(REQ.BODY)
// const me = new User({
//     name: 'Johnny ',
//     email: 'tFADart@gmail.com',
//     age: 33,
//     password: 'my123345'
// })
// me.save().then(() => {  // we could put the me in the .then callback, but we already have access to it.
//     console.log(me)
// }).catch((error) => {
//     console.log('error', error)
// })