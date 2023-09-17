const db_config = require("./config/mongodb");
const db_crud = require("./controllers/db_CRUD");
const middleware = require("./config/expressMiddleware");
const { randomBytes } = require("node:crypto");
const express = require("express");
const app = express();
const {MongoClient} = require("mongodb");
const client = new MongoClient(db_config.url);

const authentication = async(req,res,next) =>{
    //console.log(JSON.stringify(req.headers));
    if(req.headers.api_key === undefined){
        return res.status(401).json({message:"No API Key provided"})
    }
    else{
        const findKey = await  db_crud.read({api_key:req.headers.api_key},client,{
            dbName : "db_book",
            dbCollection : "key"
        });
        if(findKey === null){
            return res.status(401).json({message:"Invalid API Key"})
        }
        else{
            next();
        }
    }
}

express.json();

app.use(express.json());
app.use("/",middleware.logger);

app.get("/",(req,res)=>{
    res.status(200).send("<h1>ROOT PAGE</h1>");
})

app.get("/book",async (req,res)=>{
    
    if(Object.keys(req.body).length === 0){
        
        res.status(200).send("<h1>BOOK Page </h1>");
    }
    else{
        const db_respond = await db_crud.read(req.body,client,db_config);
        if(db_respond === null){
            const msg = {message:"Not found"};
            res.status(404).json(msg);
        }else{
            res.status(200).json(db_respond);
        }
    }
});

app.get("/key",async (req,res)=>{
    if(req.query.action === "create_key"){
        
        const key = randomBytes(32).toString("base64");
        const createKey= await db_crud.create( { api_key:key } ,client,{
            dbName : "db_book",
            dbCollection : "key"
        });

        res.status(200).json({ api_key : key});
    }
    else{
        res.status(400).json({ message:" action param required "});
    }
})

app.post("/book",authentication,middleware.queryValidation, async (req,res) =>{
    const db_respond = await db_crud.create(req.body,client,db_config);
    res.status(200).json(db_respond);
})

app.patch("/book",authentication,middleware.queryValidation, async (req,res) =>{
    const db_respond = await db_crud.update(req.body,client,db_config);
    res.status(200).json(db_respond);
})

app.delete("/book",authentication,middleware.queryValidation, async (req,res) =>{
    const db_respond = await db_crud.deleted(req.body,client,db_config);
    res.status(200).json(db_respond);
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})