require('./db/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")

const todoList = require("./schema/todo");

const app = express();
app.use(express.json())
app.use(cors())

app.get('/',(req,resp) => {
    resp.send("This is home page");
})

app.post("/saveList", async (req, res) => {

    let task = req.body.task;
    let desc = req.body.desc;
   
// send the data from the backend to mongodb
    const list = new todoList({
        task: task,
        desc: desc,
    })
    try {
        // save return promise
        let saveResult = await list.save();
        res.send(saveResult)
        console.log(saveResult);
    } catch (e) {
        res.send("ERROR");
    }
})
app.put("/update",async (req,res) => {
    let updatedTask =  req.body.newTask;
    let updatedDesc =  req.body.newDesc;

    let id =  req.body.id;

    let result = await todoList.find({_id: id});
    result[0].task = updatedTask;
    result[0].desc = updatedDesc;

    
    let saveResult = await result[0].save();
    res.send(saveResult)
    console.log(updatedDesc);
})
app.get("/all" , async (req,res) =>{
    let getAll = await todoList.find({});
    res.send(getAll);
})
app.delete("/del/:id", async (req,res) =>{
    let del_item=req.params.id;
    // console.log(del_item);
   let result= await todoList.deleteOne({_id:del_item});
    res.send(del_item);
})

app.listen(5000, () => {
    console.log("Server running on port 5000");
});