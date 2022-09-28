const express = require("express");
require("./db/mongoose");
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000;



//this function will run after request comes in 
//but before it goes to route handler
// app.use((req, res, next) => {
   
//    if(req.method === 'GET'){
//       res.send('GET requests are diabled.')
//    } else {
//       next()
//    }
// })

// app.use((req, res, next) => {
//    res.status(503).send('Site is currently under maintenance.')
// })



app.use(express.json());
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
   console.log(`App is up on port ${port}`);
});

const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
   // const task = await Task.findById('6333d202f9ee7953dd011f4c')
   // await task.populate('owner')
   // console.log(task.owner)

   const user = await User.findById('6333d0ca01e2c48f293f17ad')
   await user.populate('tasks')
   console.log(user.tasks)

}

main()


// "email": "sazwerling@gmail.com",
// "password": "red123456!"



// const jwt = require('jsonwebtoken')

// const myFunction = async() => {
//    const token = await jwt.sign({ _id: '123' }, 'thisismynewcourse', {expiresIn: '0 seconds'})
//    console.log(token)
//    const data = jwt.verify(token, 'thisismynewcourse')
//    console.log(data)
// }


// myFunction()

// const bcrypt = require('bcrypt')

// const myFunction = async () => {
//    const password = "red12345!"
//    const hashed = await bcrypt.hash(password, 8)
   
//    console.log(password)
//    console.log(hashed)

//    const isMatch = await bcrypt.compare('red12345!', hashed)
//    console.log(isMatch)
// }

// myFunction()


// THIS IS THE CODE BEFORE ASYNC REFACTOR // (req, res) IS THE START OF THE FUNCTION THAT GETS PASSED TO EXPRESS VIA APP.POST
// app.post('/users', (req, res) => {
//     const user =  new User(req.body);
//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e) => {
//         res.status(400).send(e) // must set status before send()
//     })
// })
