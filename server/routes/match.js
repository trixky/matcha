const router = require("express").Router()
const matchDB = require("../database/controllers/match")
const response = require("../Model/response")
const filter = require("../Model/filter")

router.get("/", (req, res, next) => {
    
    matchDB.getAllById(req.session.user)
    .then(data => {
        if(!data)
            return response.response(res, [])
        var array = [];
        for (key in data)
        {
            if (req.session.user == data[key].usersid[1])
                array[key] = data[key].usersid[0];
            else
                array[key] = data[key].usersid[1];
        }
        filter.getProfile(req.session.user, array, res)
    })
    .catch(err => response.errorCatch(res, "Something went wrong on match", err))
})


module.exports = router