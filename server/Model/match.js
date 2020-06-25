// const matchDB = require("../database/controllers/match")
// const likedDB = require("../database/controllers/liked")
// const utils = require("../Model/utils")

// const matchController = {}


// matchController.checkAndCreate = (user1 , user2) => {
//     return likedDB.findOneLikeById(user1.id, user2.id)
//     .then(data => {
//         if (data)
//             return likedDB.findOneLikeById(user2.id, user1.id)
//                 .then(data => {
//                     if (data)
//                     return matchDB.create(user1, user2)
//                         .then(data => true)
//                         .catch(err => utils.log(err))
//                     return null;
//                 })
//                 .catch(err => utils.log(err))
//         return null;
//     })
//     .catch(err => utils.log(err))
// }


// module.exports = matchController


