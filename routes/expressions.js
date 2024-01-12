const express = require("express");
const {getElementById,getIndexById,
createElement,updateElement,
seedElements} = require("./utils");

const expressionsRouter = express.Router();

let expressions = [];
seedElements(expressions, "expressions");

// Get all expressions
expressionsRouter.get("/",(req,res,next)=>{
    console.log(req);
    res.send(expressions);
});

// Get a single expression
expressionsRouter.get("/:id",(req,res,next)=>{
    let getData = getElementById(req.params.id,expressions);
    if(getData){
        res.send(getData);
    }else{
        res.status(404).send("Data not found");
    }
});

// Update an expression
expressionsRouter.put("/:id",(req,res,next)=>{
    let expressionsIndex = getIndexById(req.params.id,expressions);
    if(expressionsIndex !== -1){
        updateElement(req.params.id, req.query, expressions);
        res.send(expressions[expressionsIndex]);
    }else{
        res.status(404).send("Data cannot be updated!!!");
    }
});

// Create an expression
expressionsRouter.post("/",(req,res,next)=>{
    let receivedExpressions = 
    createElement("expressions",req.body);
    if(receivedExpressions){
        expressions.push(receivedExpressions);
        res.status(201).send(receivedExpressions);
    }else{
        res.status(400).send("Data cannot be created!!!");
    }
});

// Delete an expression
expressionsRouter.delete("/:id",(req,res,next)=>{
    let expressionsIndex = getIndexById(req.params.id, expressions);
    if(expressionsIndex!==-1){
        expressions.splice(expressionsIndex,1);
        res.status(204).send();
    }else{
        res.status(404).send();
    }
});


module.exports = expressionsRouter;
