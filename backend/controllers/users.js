const User = require("../models/user");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError, UnAuthorizedError} = require("../errors/custome-error");

const register = async (req,res) => {

    const user = await User.create({...req.body})
const token = user.createJWT() ;
    
    return res.status(StatusCodes.CREATED).json({user:{name:user.name},token}) ;
}

const login = async (req,res) => {
    const {email, password} = req.body ;
    if(!email || !password){
        throw new BadRequestError("Please provide email & Password");
    }

    const user = await User.findOne({email});
    //match password
    if(!user){
        throw new UnAuthorizedError("Invalid Credentials");
    }

    const iscorrectPassword = await user.comparePassword(password) ;

    if(!iscorrectPassword){
        throw new UnAuthorizedError("Invalid Credentials");
    }
    const token = user.createJWT() ;

      return res.status(StatusCodes.OK).json({user:{name: user.name},token});
}

module.exports = {
    login,register
}