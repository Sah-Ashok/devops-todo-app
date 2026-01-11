const express  = require("express");
const cors = require("cors");
const morgan = require("morgan");
const todoRoutes = require("./routes/todo.routes");
const connectDB = require("./config/db");
const client = require("prom-client");

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//Database 
connectDB();

app.use("/api/todos",todoRoutes);
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});


app.get("/health",(req,res)=>{
  res.status(200).json({status:"OK"});
})

module.exports = app;
