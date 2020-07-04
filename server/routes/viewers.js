const express =require("express")
const router = express.Router();
const viewersDB = require("../database/controllers/viewers")
const response = require("../Model/response")
const filter = require("../Model/filter")

router.get("/", (req, res, next) => {
    viewersDB.getViewers(req.session.user)
    .then(data => {
        if(!data)
            return response.response(res, [])
        var array = [];
        
        for (key in data)
            array[key] = data[key].viewerid;
        
        filter.getByArrayProfile(req.session.user, array, res)
    })
    .catch(err => response(res, "Something went wrong on viewers", err))
})

module.exports = router;