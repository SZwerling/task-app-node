const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


///USERS ENDPOINTS
app.post("/users", async (req, res) => {
   const user = new User(req.body)
   
   try {
      await user.save();
      res.status(201).send(user);
   } catch (e) {
      res.status(400).send(e);
   }
});

app.get("/users", async (req, res) => {
   try {
      const users = await User.find({});
      res.send(users);
   } catch (e) {
      res.status(500).send();
   }
});

app.get("/users/:id", async (req, res) => {
   const _id = req.params.id;
   try {
    const user = await User.findById(_id)
    if (!user) {
        return res.status(404).send();
     }
     res.send(user);
   } catch (e) {
    res.status(500).send();
   }
});

app.patch("/users/:id", async (req, res) => {
   //CHECK IF DESIRED UPDATE IS ALLOWED //
   const updates = Object.keys(req.body)  //converts keys of req object to array of those keys
   const allowedUpdates = ['name', 'email', 'password', 'age'] //arr of allowed updates so we can compare
   const isValid = updates.every((item) => allowedUpdates.includes(item)) //returns boolean as to if every desired updated exists in allowed arr 
   if(!isValid){
      return res.status(400).send({ error: 'Invalid Updates!' })
   }
   /////////////////
   try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) 
      if(!user){                                //find by id   //update info  //send back updated user //run validators on update info
         return res.status(404).send()
      }

      res.send(user)
   } catch (e) {
      res.status(400).send(e)
   }
})


///TASKS ENDPOINT
app.post("/tasks", async (req, res) => {
   const task = new Task(req.body);
   try {
    await task.save()
    res.status(201).send(task);
   } catch (e) {
    res.status(400).send(e);
   }
});

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

app.get("/tasks/:id", async (req, res) => {
   const _id = req.params.id;
   try {
    const task = await Task.findById(_id)
    if (!task) {
        return res.status(404).send();
     }
     res.send(task);
   } catch (e) {
    res.status(500).send();
   }
});

app.patch("/tasks/:id", async (req, res) => {
   const _id = req.params.id;
   const allowedUpdates = ['task', 'completed']
   const updates = Object.keys(req.body)
   const isValid = updates.every((item) => allowedUpdates.includes(item))
   if(!isValid){
      return res.status(400).send({ error: 'Invalid Updates!' })
   }

   try {
      const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true }) 
      if(!task){                                //find by id   //update info  //send back updated user //run validators on update info
         return res.status(404).send()
      }
      res.send(task)
   } catch (e) {
      res.status(400).send(e)
   }
})


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
