require('../src/db/mongoose')
const User = require('../src/models/user')


User.findByIdAndUpdate('63069aa79dfef375f2f9b8a1', {age: 1}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 1})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})


// 63069a7d81ebeb0b209a1b89