// CRUD -- CREATE READ UPDATE DELETE
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId

const { MongoClient, ObjectId } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

// const id = new ObjectId() // returns eg 6303c6920726aa05ec097ebd // explanagtion: https://www.mongodb.com/docs/v5.2/reference/method/ObjectId/
// console.log(id.getTimestamp())

MongoClient.connect(
   connectionURL,
   { useUnifiedTopology: true },
   { useNewUrlParser: true },
   (error, client) => {
      if (error) {
         return console.log("Unable to connect to database");
      }

      const db = client.db(databaseName);
      console.log("connected");

      db.collection('tasks').updateMany({
        completed: false
      }, {
        $set: {
            completed: true
        }
      }).then((result) => {
        console.log(result.modifiedCount)
      }).catch((e) => {
        console.log(e)
      })



   }
);







//FIND AND FINDONE

    //   db.collection('users').findOne({ _id: ObjectId("6303c84995c9b759747fefd2") }, (err, user) => {
    //     if(err){
    //         console.log('there was an error')
    //     } else {
    //         console.log('hello')
    //         console.log(user)
    //     }
    //   })

    // db.collection('users').find({ age: 132}).toArray((error, users) => { //.find() returns a cursor rather potential mountain of docs
    //     if(error){                                                       // info here: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/cursor/
    //         console.log('error')
    //     } else {
    //         console.log(users)
    //     }
    // })

    // db.collection('users').find({ age: 132}).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({ _id: ObjectId("630123b15139323d64825ae4") }, (err, task) => {
    //     if(err){
    //         console.log('Whoops')
    //     } else {
    //         console.log(task)
    //     }
    // })

    // db.collection('tasks').find({ completed: true}).toArray((error, tasks) => {
    //     console.log(tasks)
    // })




    // INSERT ONE
    // db.collection('users').insertOne({ name: "Clark", age: 35}, (err, result) => {
    //     if(err){
    //         console.log('there was an error')
    //     } else {
    //         console.log(result.ops)
    //     }
    //   })


    //UPDATE ONE
    // const updatePromise = db.collection('users').updateOne({
    //     _id: ObjectId("6304f9d02b84170fe0cbf6ff")
    //   }, {
    //     $set: {
    //         name: 'Newer New Name'
    //     }
    //   })

    //   updatePromise.then((result) => {
    //     console.log(result.ops)
    //   }).catch((e) => {
    //     console.log(e)
    //   })

    // OR CHAIN THEM TOGETHER WITHOUT CREATING VARIABLE
    // db.collection('users').updateOne({
    //     _id: ObjectId("6304f9d02b84170fe0cbf6ff")
    //   }, {
    //     $set: {
    //         age: 666
    //     }
    //   }).then((result) => {
    //     console.log(result)
    //   }).catch((e) => {
    //     console.log(e)
    //   })



