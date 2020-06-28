const router = require("express").Router()
const userDB = require("../database/controllers/userDB")
const filter = require("../Model/filter")
const response = require("../Model/response")


router.get("/", (req, res, next) => {
    
    userDB.findOneUserById(req.session.user)
    .then(user => {
        filter.usersFilter(req.session.user)
        .then(data => {
            data = filter.sort(user, data);
            response.response(res, data)
        })
        .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
    })
    .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
})


router.post("/", (req, res, next) => {
            
    const userid = req.session.user; 

    const ageMin = req.body.user ? req.body.user.ageMin: null;
    const ageMax = req.body.user ? req.body.user.ageMax: null;
    const repuMin = req.body.user ? req.body.user.repuMin: null;
    const repuMax = req.body.user ? req.body.user.repuMax : null;
    const tags = req.body.user ? req.body.user.tags : [];

    userDB.findOneUserById(req.session.user)
    .then(user => {
        filter.usersFilter(userid, ageMin, ageMax, repuMin, repuMax, tags)
        .then(data => {
            data = filter.sort(user, data);
            if (req.body.user.distanceMax && Number.isInteger(req.body.user.distanceMax))
                data = filter.filterGps(data, req.body.user.distanceMax)
            response.response(res, data)
        })
        .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
    })
    .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
})

module.exports = router;