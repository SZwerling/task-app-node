const mongoose = require('mongoose')

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager-api";
mongoose.connect(connectionURL + '/' + databaseName)

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: 'Juanito',
    age: 33
})

me.save().then(() => {  // we could put the me in the .then callback, but we already have access to it.
    console.log(me)
}).catch((error) => {
    console.log('error', error)
})