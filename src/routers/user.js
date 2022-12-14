const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {
   const user = new User(req.body);

   try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).send({ user: user, token: token });
   } catch (e) {
      res.status(400).send(e);
   }
});

router.post("/users/login", async (req, res) => {
   try {
      const user = await User.findByCredentials(
         req.body.email,
         req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({ user: user, token: token });
   } catch (e) {
      res.status(400).send();
   }
});

router.post('/users/logout', auth, async (req, res) => {
   try {
       req.user.tokens = req.user.tokens.filter((token) => {
           return token.token !== req.token
       })
       await req.user.save()

       res.send()
   } catch (e) {
       res.status(500).send()
   }
})

router.post('/users/logoutAll', auth, async (req, res) => {
   try {
       req.user.tokens = []
       await req.user.save()
       res.send()
   } catch (e) {
       res.status(500).send()
   }
})

router.get("/users/me", auth, async (req, res) => {
   res.send(req.user);
});


router.patch("/users/me", auth, async (req, res) => {
   //CHECK IF DESIRED UPDATE IS ALLOWED //
   const updates = Object.keys(req.body); //converts keys of req object to array of those keys
   const allowedUpdates = ["name", "email", "password", "age"]; //arr of allowed updates so we can compare
   const isValid = updates.every((item) => allowedUpdates.includes(item)); //returns boolean as to if every desired updated exists in allowed arr
   if (!isValid) {
      return res.status(400).send({ error: "Invalid Updates!" });
   }
   /////////////////
   try { 
      updates.forEach((update) => {
         req.user[update] = req.body[update];
      });
      await req.user.save();
      res.send(req.user);
   } catch (e) {
      res.status(400).send(e);
   }
});

router.delete("/users/me", auth, async (req, res) => {
   try {
      await req.user.remove()
      res.send(req.user);
   } catch (e) {
      res.status(500).send();
   }
});

module.exports = router;
