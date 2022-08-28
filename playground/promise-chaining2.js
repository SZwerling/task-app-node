require('../src/db/mongoose')

const Task = require('../src/models/task')



Task.findByIdAndDelete('63069efcb199aa6915406e17').then((deleted) => {
    console.log(deleted)
    return  Task.countDocuments({ completed: false})
}).then((result) => {
   console.log(result)
}).catch((e) => {
    console.log(e)
})

// remove task by id
// get and print total number of incomplete tasks
// test work.