
const utils = require("../Model/utils")

const response = {}

response.errorResponse = (res,  message) =>
{
    return res.json({
        _status: -1,
        _data: message 
    })
}


response.errorCatch = (res,  message, err) =>
{
    utils.log(message)
    utils.log(err)
    return res.json({
        _status: -1,
        _data: message 
    })
}

response.response = (res,  message) => 
{
    return res.json({
        _status: 0,
        _data: message 
    })
}

module.exports = response;