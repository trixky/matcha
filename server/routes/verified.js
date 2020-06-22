const router = require("express").Router();
const userDB = require("../database/controllers/userDB")

router.get('/', (req, res) =>{
    if(req.query)
        if(req.query.email && req.query.verified)
        {
            userDB.findOneUserByEmail(req.query.email)
            .then(data => {
                if (data.verified === "") {return res.redirect("http://localhost:3000/")}
                if (data.verified === req.query.verified)
                {
                    data.verified = null;
                    userDB.updateUser(data)
                    res.redirect("http://localhost:3000")
                }
                else
                    res.redirect("http://localhost:3000/404")
            })
            .catch(err => {
                console.log(err)
                res.redirect("http://localhost:3000/404")})
        }
})

module.exports = router