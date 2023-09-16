const db_config = require("./config/mongodb");
const db_crud = require("./controllers/db_CRUD");
const middleware = require("./config/expressMiddleware");
const express = require("express");
const app = express();
const {MongoClient} = require("mongodb");
const client = new MongoClient(db_config.url);

express.json();

app.use(express.json());
app.use("/",middleware.logger);

app.get("/",(req,res)=>{
    res.status(200).send("<h1>ROOT PAGE</h1>");
})

app.get("/book",middleware.queryValidation,async (req,res)=>{
    const action = req.query.action;
    if(action === "create"){
        const db_respond = await db_crud.create(req.body,client,db_config);
        res.status(200).json(db_respond);
    }
    else if(action === "read"){
        const db_respond = await db_crud.read(req.body,client,db_config);
        res.status(200).json(db_respond);
    }
    else if(action === "update"){
        const db_respond = await db_crud.update(req.body,client,db_config);
        res.status(200).json(db_respond);
    }
    else if(action === "delete"){
        const db_respond = await db_crud.deleted(req.body,client,db_config);
        res.status(200).json(db_respond);
    }
});

app.listen(3000,()=>{
    console.log("listening on port 3000");
})