// CRUD -- CREATE READ UPDATE DELETE
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId

const { MongoClient, ObjectId } = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

const id = new ObjectId() // returns eg 6303c6920726aa05ec097ebd // explanagtion: https://www.mongodb.com/docs/v5.2/reference/method/ObjectId/
console.log(id.getTimestamp())

MongoClient.connect(
   connectionURL,
   { useUnifiedTopology: true },
   { useNewUrlParser: true },
   (error, client) => {
      if (error) {
         return console.log("Unable to conect to database");
      }

      const db = client.db(databaseName);

      console.log("connected");

        // db.collection("tasks").insertMany([
        //     {
        //         task: "clean garage",
        //         completed: false
        //     },
        //     {
        //         task: "eat breakfast",
        //         completed: true
        //     },
        //     {
        //         task: "apply for jobs",
        //         completed: true
        //     }
        // ],(error, result) => {
        //     if(error){
        //         return console.log('there was an error')
        //     }
        //     console.log(result.ops)
        // })

    //   db.collection("users").insertOne(
    //      {
    //         _id: id,
    //         name: "Splooshy",
    //         age: 13,
    //      },
    //      (error, result) => {
    //         if (error) {
    //            return `error: ${error}`;
    //         }
    //         console.log(result.ops);
    //         console.log(result.insertedCount)
    //      }
    //   );
    
   }
);



// INSERT THREE TASKS INTO A NEW TASKS COLLECTION
// description (string), completed (boolean)
// callback to handle error or print ops property

