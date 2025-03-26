const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const router = express.Router();


router.post("/register", async(req,res)=>{
    let model = req.body;
    if(model.name && model.email && model.password){
        //Do the registration 
        await registerUser(model);
        res.send({
            message:"User registered"
        })

    } else{
        res.status(400).json({
            error:"Please Provide Name, Email And Password"
        });
    }
});

router.post("/login", async (req, res) => {
    const model = req.body;

    // 🔹 Validate input
    if (!model.email || !model.password) {
        return res.status(400).json({ error: "Please provide Email and Password" });
    }

    const result = await loginUser(model);

    if (result) {
        res.json(result);
    } else {
        res.status(400).json({ error: "Please provide correct Email and Password" });
    }
});

module.exports = router;



module.exports = router;