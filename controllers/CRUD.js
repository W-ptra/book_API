const data = require("../config/mongodb");
const {MongoClient} = require("mongodb");
const client = new MongoClient(data.db_config.url);

const create = async (payload)=>{
    try{
        //establish connection and config
        await client.connect();

        const db = client.db(data.db_config.dbname);
        const collection = db.collection(data.db_config.dbCollection);
        //insert query
        if(Array.isArray(payload)){
            const query = await collection.insertMany(payload);
            return query;
        }
        else{
            const query = await collection.insertOne(payload);
            return query;
        }
    }
    catch(err){
        return err;
    }
};

const read = async(payload)=>{
    try{
        //establish connection and config
        await client.connect();

        const db = client.db(data.db_config.dbname);
        const collection = db.collection(data.db_config.dbCollection);

        //read query
        const query = await collection.findOne(payload);
        
        return query;
    }
    catch(err){
        return err;
    }
}

const update = async (payload)=>{
    try{
        //establish connection and config
        await client.connect();

        const db = client.db(data.db_config.dbname);
        const collection = db.collection(data.db_config.dbCollection);

        //update query
        const query = await collection.updateOne(payload[0],{$set:payload[1]});

        return query;
    }
    catch(err){
        return err;
    }
}

const deleted = async (payload)=>{
    try{
        //establish connection
        await client.connect();

        const db = client.db(data.db_config.dbname);
        const collection = db.collection(data.db_config.dbCollection);

        //delete query
        if(Array.isArray(payload,client,db)){
            const query = await collection.deleteMany(payload);

            if(query.deletedCount === 0){
                return "Not found";
            }
            else{
                return query;
            }
        }
        else{
            const query = await collection.deleteOne(payload);
            if(query.deletedCount === 0){
                return {Message:"Not found"};
            }
            else{
                return query;
            }
        }
    }
    catch(err){

    }
}

module.exports = {create,read,update,deleted};