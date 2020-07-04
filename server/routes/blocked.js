const router = require("express").Router()
const blockedDB = require("../database/controllers/blocked")
const response = require("../Model/response")
const userDB = require("../database/controllers/userDB")
const filter = require("../Model/filter")

router.get("/", (req, res, next) =>{    
    
    blockedDB.getAll(req.session.user)
    .then(data => {
        if(!data)
            return response.response(res, [])
        var array = [];
        for (key in data)
            array[key] = data[key].blockedid;
        filter.getByArrayProfile(req.session.user, array, res)
    })
    .catch(err => response.errorCatch(res, "Something went wrong in blocked router 1", err))

})

router.post("/", (req, res, next) =>{
    
    if (!req.body.user || !req.body.user.username)
        return response.errorResponse(res, "You didn't put a username");

    userDB.findOneUserByUsername(req.body.user.username)
    .then(data => {
        
        if (!data)
            return response.errorResponse(res, "No user with this username");

        userDB.updateFame(data.id, -1);

        blockedDB.create(req.session.user, data)
            .then(data => response.response(res, "User have been blocked"))
            .catch(err => response.errorCatch(res, "Something went wrong in blocked router 1", err))
    })
    .catch(err => response.errorCatch(res, "Something went wrong in blocked router 2", err))
    
})

router.put("/", (req, res, next) =>{
    
    if (!req.body.user || !req.body.user.username)
        return response.errorResponse(res, "You didn't put a username");

    userDB.findOneUserByUsername(req.body.user.username)
    .then(data => {
        
        if (!data)
            return response.errorResponse(res, "No user with this username");

        blockedDB.delete(req.session.user, data.id)
        .then(data => response.response(res, "User have been unblocked"))
        .catch(err => response.errorCatch(res, "Something went wrong in blocked router 1", err))
    })
    .catch(err => response.errorCatch(res, "Something went wrong in blocked router 2", err))
})

module.exports = router;