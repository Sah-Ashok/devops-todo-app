const router = require("express").Router();
const constroller = require("../controllers/todo.controller");

router.get("/",constroller.getTodos);
router.post("/",constroller.createTodo);

module.exports = router;