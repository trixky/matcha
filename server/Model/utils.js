const fs = require('fs')
const utils = {}

utils.randomString = () => {
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

utils.stream = fs.createWriteStream(__dirname.split("/Model")[0] + "/errorLog", {flags:"a"})

utils.log = (message) => {
    utils.stream.write(message + "\r\n");
}

utils.removeFile = (filename) => {
    fs.unlink(filename, () => {})
}

utils.getDate = () => {
    return utils.formateDate(new Date());
}

utils.formateDateArray = (data) => {
    for(var i = 0; i < data.length; i++)
        if (data[i])
            data[i].created = utils.formateDate(data[i].created)
    return data;
}

utils.formateDate = (update) => {
    return update.getDate() + "/" + (update.getMonth() + 1) + "/" + update.getFullYear() + " " + update.getHours() + ":" + update.getMinutes();
}

utils.marketNotifications = (data) => {
    for(var i = 0; i < data.length; i++)
        if (data[i])
        {
            if (data[i].type === 1)
                data[i].notification = '❤️ ' + data[i].notification;
            else if (data[i].type === 2)
              data[i].notification = '💕 ' + data[i].notification;
            else if (data[i].type === 3)
              data[i].notification = '✉️ ' + data[i].notification;
            else if (data[i].type === 4)
              data[i].notification = '👁️ ' + data[i].notification;
            else if (data[i].type === 5)
              data[i].notification = '💔 ' + data[i].notification;
        }
    return data;
}
module.exports = utils;