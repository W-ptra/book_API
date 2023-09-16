const create = async (payload,client,db_config)=>{
    try{
        const dbName = db_config.dbName;
        const dbCollection = db_config.dbCollection;

        //establish connection and config
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(dbCollection);
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

const read = async(payload,client,db_config)=>{
    try{
        const dbName = db_config.dbName;
        const dbCollection = db_config.dbCollection;

        //establish connection and config
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(dbCollection);

        //read query
        const query = await collection.findOne(payload);

        return query;
    }
    catch(err){
        return err;
    }
}

const update = async (payload,client,db_config)=>{
    try{
        const dbName = db_config.dbName;
        const dbCollection = db_config.dbCollection;

        //establish connection and config
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(dbCollection);

        //update query
        const query = await collection.updateOne(payload[0],{$set:payload[1]});

        return query;
    }
    catch(err){
        return err;
    }
}

const deleted = async (payload,client,db_config)=>{
    try{
        const dbName = db_config.dbName;
        const dbCollection = db_config.dbCollection;

        //establish connection
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(dbCollection);

        //delete query
        if(Array.isArray(payload,client,db_config)){
            const query = await collection.deleteMany(payload);
            return query;
        }
        else{
            const query = await collection.deleteOne(payload);
            return query;
        }
    }
    catch(err){

    }
}

module.exports = {create,read,update,deleted};