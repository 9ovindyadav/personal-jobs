const express = require("express")
const router = express.Router();

const {getAlljobs,getJob,createJob,updateJob,deleteJob} = require("../controllers/jobs")

router.route("/").get(getAlljobs).post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router ;