require('../src/db/mongoose')

const Task = require('../src/models/task')



// Task.findByIdAndDelete('63069efcb199aa6915406e17').then((deleted) => {
//     console.log(deleted)
//     return  Task.countDocuments({ completed: false})
// }).then((result) => {
//    console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCout = async (id) => {
    await Task.findByIdAndDelete(id)    // do not need to store returned value from await in a variable eg const del = await Task.findByYourMommaAndDelete
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCout('630a341379cbd0757c5335e6').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})

// remove task by id
// get and print total number of incomplete tasks
// test work.