const router = require("express").Router();
const userDB = require("../database/controllers/userDB")
const response = require("../Model/response")

router.get('/', (req, res) =>{
    if(req.query)
    {
        if(req.query.email && req.query.verified)
        {
            userDB.findOneUserByEmail(req.query.email)
            .then(data => {
                if(data)
                {
                    if (data.verified === "") {return res.redirect("http://localhost:3000/")}
                    if (data.verified === req.query.verified)
                    {
                        data.verified = null;
                        userDB.updateUser(data)
                        return res.redirect("http://localhost:3000")
                    }
                }
                res.redirect("http://localhost:3000/404")
                
            })
            .catch(err => {
                res.redirect("http://localhost:3000/404")})
        }
        else
            response.errorResponse(res, "Bad query");
    }
    else
        response.errorResponse(res, "Bad query");
})

module.exports = router