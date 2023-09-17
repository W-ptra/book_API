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

module.exports = { logger , queryValidation};