const express = require("express");
require("./db/mongoose");

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter)
app.use(taskRouter)





app.listen(port, () => {
   console.log(`App is up on port ${port}`);
});




// THIS IS THE CODE BEFORE ASYNC REFACTOR // (req, res) IS THE START OF THE FUNCTION THAT GETS PASSED TO EXPRESS VIA APP.POST
// app.post('/users', (req, res) => {
//     const user =  new User(req.body);
//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e) => {
//         res.status(400).send(e) // must set status before send()
//     })
// })
