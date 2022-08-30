require('../src/db/mongoose')

const User = require('../src/models/user')



// User.findByIdAndUpdate('63069aa79dfef375f2f9b8a1', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count =  await User.countDocuments({ age: age })
    return count
}

updateAgeAndCount('63069c9e7483eb57921afd30', 44).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})



