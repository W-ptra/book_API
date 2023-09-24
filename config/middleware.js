const readKey = require("../controllers/APIKey");

const logger = (req,res,next)=>{
    const time = new Date();
    const timeline = `${time.getHours()}:${time.getMinutes()}:${time.getMilliseconds()} ${time.getFullYear()}-${time.getMonth()}-${time.getDay()}`;
    console.log(`${timeline} '${req.method}' ${req.protocol} ${req.hostname} ${req.path} query:${JSON.stringify(req.query)} body:${JSON.stringify(req.body)}`);
    next();
};

const queryValidation = (req,res,next) =>{
    if(Object.keys(req.body).length === 0){
        return res.status(400).json({error:"request body is required"});
    }
    next();
};

const authentication = async (req,res,next) =>{
    //console.log(JSON.stringify(req.headers));
    
    if(req.headers.apikey === undefined){
        console.log("api key missing");
        return res.status(401).json({message:"No API Key provided"})
    }
    else{
        const findKey = await  readKey.read({api_key:req.headers.apikey});
        //console.log(findKey + " " + req.headers.apikey);
        if(findKey === null){
            return res.status(401).json({message:"Invalid API Key"})
        }
        else{
            next();
        }
    }
}

module.exports = { logger , queryValidation, authentication};