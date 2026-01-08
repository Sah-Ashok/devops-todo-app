const Todo = require("../models/todo.model")

exports.getTodos = async (req,res)=>{
  const todos = await Todo.find();
  res.status(200).json(todos);
}

exports.createTodo = async (req,res) =>{
  const todo = await Todo.create(req.body);
  res.status(201).json(todo);
}

