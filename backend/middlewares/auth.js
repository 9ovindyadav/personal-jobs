const { UnAuthorizedError } = require("../errors/custome-error");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authentication = async (req,res,next) => {
    const authHeader = req.headers.authorization ;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new UnAuthorizedError("Authentication Invalid");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = User.findById(decoded.userID).select("-password");
        req.user = user ;
        req.user = {userID: decoded.userID, name: decoded.name};
        next();
    } catch (error) {
        throw new UnAuthorizedError("Authentication Invalid")
    }
}

module.exports = authentication ;