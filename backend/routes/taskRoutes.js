const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const {
    createTask,
    getTasks,
    deleteTask,
    updateTask,
    editTask,

} = require("../controllers/taskController");

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);

router.put("/edit/:id", protect, editTask);



module.exports = router;