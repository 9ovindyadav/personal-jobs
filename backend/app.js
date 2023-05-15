const express = require("express");
const app = express();

require("dotenv").config();
require("express-async-errors");

const connectDB = require("./db/connect")

const notFound = require("./middlewares/not-found")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const authentication = require("./middlewares/auth");

//routes
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");

//middleware
app.use(express.json())


app.get("/",(req,res) => {
    res.send("<h1>Server is working</h1>")
})

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/job",authentication,jobRoutes);


app.use(errorHandlerMiddleware);
app.use(notFound);


const port = process.env.PORT || 3000 ;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is listening on port: ${port}...`))
    } catch (error) {
        console.error(error);
    }
}

start();