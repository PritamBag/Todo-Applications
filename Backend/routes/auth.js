const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//Sign Up

router.post("/signup", async (req,res) => {
    try {
      const { email, username, password } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        lists: [],
      });

      await newUser.save();
      res.status(200).json({message: "Signup Successfull"});
    } catch (error) {
        res.status(200).json({message: "User Already Exists"});
    }
});




//Sign In

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email});
    if(!user){
      res.status(200).json({
        message: "Please Sign Up First"
      });
    }

    const correctPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if(!correctPassword){
      res.status(200).json({
        message: "Password is not Correct"
      });
    }
    const {password,...others} = user._doc;
    res.status(200).json({others});
    

  } catch (error) {
    res.status(200).json({ message: "User Already Exists" });
  }
});

module.exports = router;