const Job = require("../models/job")
const {StatusCodes} = require("http-status-codes");
const {BadRequestError,NotFoundError} = require("../errors/custome-error")


const getAlljobs = async (req,res) => {
    const jobs = await Job.find({createdBy: req.user.userID}).sort("createdAt");
    return res.status(StatusCodes.OK).json({count: jobs.length, jobs});
}

const getJob = async (req,res) => {
      const {user:{userID},params:{id:jobID}} = req ;
     
      const job = await Job.findOne({
        _id: jobID,
        createdBy: userID
      })
      if(!job){
        throw new NotFoundError(`No job with id: ${jobID}`);
      }
      return res.status(StatusCodes.OK).json({job});
}

const createJob = async (req,res) => {

    req.body.createdBy = req.user.userID ;
    const job = await Job.create(req.body)
    return res.status(StatusCodes.CREATED).json({job});
}

const updateJob = async (req,res) => {
    const {body:{company,position},user:{userID},params:{id: jobID}} = req ;
    if(!company || !position){
        throw new BadRequestError("Company and position fileds can't be empty")
    }
    if(company === "" || position === ""){
        throw new BadRequestError("Company and position fileds can't be empty")
    }

    const job = await Job.findByIdAndUpdate({_id:jobID, createdBy: userID},req.body,{new:true, runValidators: true});
    if(!job){
        throw new NotFoundError(`no job with id ${jobID}`);
    }
    return res.status(StatusCodes.OK).json({job});
}

const deleteJob = async (req,res) => {
    const {user:{userID},params:{id:jobID}} = req ;
    const job = await Job.findByIdAndDelete({_id:jobID,createdBy:userID});
    if(!job){
        throw new NotFoundError(`no job with id ${jobID}`);
    }
    return res.status(StatusCodes.OK).json({msg: `job with id ${jobID} deleted succesfully`});
}

module.exports = {
    getAlljobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}