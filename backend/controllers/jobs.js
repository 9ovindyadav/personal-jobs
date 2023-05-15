const getAlljobs = async (req,res) => {
    return res.status(200).json({msg: "All jobs"})
}

const getJob = async (req,res) => {
      return res.status(200).json({msg: "get single job"});
}

const createJob = async (req,res) => {
    return res.status(200).json({msg: "create job",data: req.user});
}

const updateJob = async (req,res) => {
    return res.status(200).json({msg: "update job"});
}

const deleteJob = async (req,res) => {
    return res.status(200).json({msg: "delete job"});
}

module.exports = {
    getAlljobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}