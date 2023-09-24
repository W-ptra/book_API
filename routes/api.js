const crud = require("../controllers/CRUD");
const createKey = require("../controllers/APIKey");
const { randomBytes } = require("node:crypto");

const get_key = async (req,res)=>{
    if(req.query.action === "createKey"){
        
        const key = randomBytes(32).toString("base64");
        const makeKey = await createKey.create({ api_key : key});
        console.log(makeKey);
        return res.status(200).json({ api_key : key});
    }
    else{
        return res.status(400).json({ message : "action param required "});
    }
};

const get_book = async (req,res)=>{
    if(Object.keys(req.body).length === 0){
        
        return res.status(200).send("<h1>BOOK Page </h1>");
    }
    else{
        console.log("read");
        const db_respond = await crud.read(req.body);
        console.log(db_respond);
        if(db_respond === null){
            const msg = {message:"Not found"};
            return res.status(404).json(msg);
        }else{
            return res.status(200).json(db_respond);
        }
    }
};

const post_book = async (req,res) =>{
    console.log("post book");
    const db_respond = await crud.create(req.body);
    console.log(`post respond = ${db_respond}`);
    return res.status(200).json(db_respond);
};

const patch_book = async (req,res) =>{
    const db_respond = await crud.update(req.body);
    console.log(`patch respond = ${db_respond}`);
    return res.status(200).json(db_respond);
};

const delete_book = async (req,res) =>{
    const db_respond = await crud.deleted(req.body);
    console.log(`delete respond = ${db_respond}`);
    return res.status(200).json(db_respond);
};

module.exports = { get_key, get_book, post_book, patch_book, delete_book};