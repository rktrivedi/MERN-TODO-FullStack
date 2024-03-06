const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

router.put("/updateTask/:id", async (req, res) => {
  try {
    const {title, body, email, dueDate, category} = req.body;
    const existingUser = await User.findOne({email});

    if (existingUser) {
      const list = await List.findByIdAndUpdate(req.params.id, {
        title,
        body,
        category,
      });
      await list.save();
      res.status(200).json({message: "Task Updated"});
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

// API for Deleting Task
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const {email} = req.body;
    const existingUser = await User.findOneAndUpdate(
      {email},
      {$pull: {list: req.params.id}}
    );

    if (existingUser) {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json({message: "Task Deleted"});
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

// Fetch Tasks For User
router.get("/getTasks/:id", async (req, res) => {
  try {
    const list = await List.find({user: req.params.id}).sort({createdAt: -1});

    if (list.length !== 0) {
      res.status(200).json({list});
    } else {
      res.status(200).json({message: "No Task Available"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "Internal Server Error"});
  }
});

// Additional routes...

module.exports = router;
