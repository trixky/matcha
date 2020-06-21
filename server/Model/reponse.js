
const reponse = {}

reponse.errorResponse = (res,  message) =>
{
    return res.json({
        _status: -1,
        _data: message 
    })
}

reponse.Response = (res,  message) => 
{
    return res.json({
        _status: 0,
        _data: message 
    })
}

module.exports = reponse;