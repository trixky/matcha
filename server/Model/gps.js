const axios = require("axios")
const utils = require("../Model/utils")

const gps = {}

gps.getCoordonned  = async (ip) => {
    const url = `http://api.ipstack.com/${ip}?access_key=b1955a3634a2a011d058c55bd7afb15d`
    
    return axios.get(url)
    .then(response => {        
        return response.data
    })
    .catch(err => utils.log(err))
}

module.exports = gps;