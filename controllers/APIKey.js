const data = require("../config/mongodb");
const {MongoClient} = require("mongodb");
const client = new MongoClient(data.db_config.url);

const create = async (payload)=>{
    try{
        //establish connection and config
        await client.connect();
        //console.log(typeof(data.db_key.dbCollection));
        const db = client.db(data.db_key.dbName);
        const collection = db.collection(data.db_key.dbCollection);
        //insert query
        const query = await collection.insertOne(payload);
        return query;
    }
    catch(err){
        return err;
    }
};

const read = async (payload)=>{
    try{
        //establish connection and config
        await client.connect();
        //console.log(typeof(data.db_key.dbCollection));
        const db = client.db(data.db_key.dbName);
        const collection = db.collection(data.db_key.dbCollection);
        //find query
        console.log(payload);
        const query = await collection.findOne(payload);
        console.log(query);
        return query;
    }
    catch(err){
        return err;
    }
}; 

module.exports = {create , read};