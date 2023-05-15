const notFound = (req,res) => {
    return res.status(404).send("<h1>Resource doesn't exist</h1><p>Go back to</p> <a href='/'>Home</a>")
};

module.exports = notFound ;