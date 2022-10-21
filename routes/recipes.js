const express = require("express");
const recipesRouter = express.Router();
// Write your router code here!
recipesRouter.get("/", (req, res) => {
    console.log("hello")
    res.send("hi")
})



module.exports = recipesRouter;
