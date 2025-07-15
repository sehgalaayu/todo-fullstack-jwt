const jwt = require("jsonwebtoken")
const JWT_TOKEN = "secretkeyofno";

const generateToken = (user)=>{
    return jwt.sign({ userId: user._id , username : user.username}, JWT_TOKEN)
}

const verifyToken = (token)=>{
    return jwt.verify(token, JWT_TOKEN)
}

module.exports = {generateToken,verifyToken};