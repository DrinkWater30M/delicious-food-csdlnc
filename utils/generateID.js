const crypto = require("crypto");

module.exports = function generateID(preString){
    const randomString = crypto.randomBytes(4).toString("hex");
    const id = `${preString}${new Date()/1}${randomString}`;
    return id;
}