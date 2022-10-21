const express = require("express");
const router = express.Router();
// Write your router code here!


router.get('/', (req, res) => {
    console.log("hello")
    res.json("hello")
})


module.exports = router;
