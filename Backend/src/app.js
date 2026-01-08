const express  = require("express");
const cors = require("cors");
const morgan = require("morgan");
const todoRoutes = require("./routes/todo.routes");
const connectDB = require("./config/db");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Database 
connectDB();

app.use("/api/todos",todoRoutes);


app.get("/health",(req,res)=>{
  res.status(200).json({status:"OK"});
})

module.exports = app;
