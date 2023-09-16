const logger = (req,res,next)=>{
    const time = new Date();
    const timeline = `${time.getHours()}:${time.getMinutes()}:${time.getMilliseconds()} ${time.getFullYear()}-${time.getMonth()}-${time.getDay()}`;
    console.log(`${timeline} '${req.method}' ${req.protocol} ${req.hostname} ${req.path} query:${JSON.stringify(req.query)} body:${JSON.stringify(req.body)}`);
    next();
};

const queryValidation = (req,res,next) =>{
    const { action } = req.query;
    if(!action){
        return res.status(400).json({error:"action query is required"});
    }

    const list = ["create","read","delete","update"];
    const isInclude =  list.includes(action);

    if(!isInclude){
        return res.status(400).json({error:"invalide action"});
    }

    if(Object.keys(req.body).length === 0){
        return res.status(400).json({error:"request body is required"});
    }
    
    next();
};

module.exports = { logger , queryValidation};