const express = require("express");
const User = require("../models/user");
const router = new express.Router()


router.post("/users", async (req, res) => {
    const user = new User(req.body)
    
    try {
       await user.save();
       res.status(201).send(user);
    } catch (e) {
       res.status(400).send(e);
    }
 });

 router.post('/users/login', async (req, res) => {
   try {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      res.send(user)
   } catch (e) {
      res.status(400).send()
   }
 })
 
 router.get("/users", async (req, res) => {
    try {
       const users = await User.find({});
       res.send(users);
    } catch (e) {
       res.status(500).send();
    }
 });
 
 router.get("/users/:id", async (req, res) => {
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
 
 router.patch("/users/:id", async (req, res) => {
    //CHECK IF DESIRED UPDATE IS ALLOWED //
    const updates = Object.keys(req.body)  //converts keys of req object to array of those keys
    const allowedUpdates = ['name', 'email', 'password', 'age'] //arr of allowed updates so we can compare
    const isValid = updates.every((item) => allowedUpdates.includes(item)) //returns boolean as to if every desired updated exists in allowed arr 
    if(!isValid){
       return res.status(400).send({ error: 'Invalid Updates!' })
    }
    /////////////////
    try {
      const user = await User.findById(req.params.id)
      updates.forEach((update) => {
         user[update] = req.body[update]
      })
      await user.save()
      
      if(!user){                               
          return res.status(404).send()
       }
 
       res.send(user)
    } catch (e) {
       res.status(400).send(e)
    }
 })
 
 router.delete('/users/:id', async (req, res) => {
    try {
       const user = await User.findByIdAndDelete(req.params.id)
       if(!user){
          return res.status(404).send()
       }
       res.send(user)
    } catch (e) {
       res.status(500).send()
    }
 })
 

 module.exports = router;