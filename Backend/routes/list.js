const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// Create Task
router.post("/createTask", async (req,res) => {
    try {
        const { title, about, id } = req.body;
        const existingUser = await User.findById(id);
        if (existingUser) {
          const list = new List({ title, about, user: existingUser });
          await list.save().then(() => res.status(200).json({list}));
          existingUser.list.push(list);
          existingUser.save();
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// Get Task
router.get("/getTask/:id", async(req,res) => {
    const list = await List.find({user:req.params.id}).sort({createdAt: -1});
    if(list.length!=0){
        res.status(200).json({ list });
    }else{
        res.status(200).json({ message: "No Task Found" });
    }
    
});



// Update Task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, about, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = await List.findByIdAndUpdate(req.params.id,{title,about});
      list.save().then( ()=> res.status(200).json({ message: "Task Updated"}));
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { id } = req.body;
    const existingUser = await User.findByIdAndUpdate(
      id,
      { $pull: { list: req.params.id } }
    );
    if (existingUser) {
      await List.findByIdAndDelete(req.params.id).then( ()=> res.status(200).json({ message: "Task Deleted"}));
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;