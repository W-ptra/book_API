const db_config = {
    url : "mongodb://localhost:27017",
    dbName : "db_book",
    dbCollection : "book"
}

const db_key = {
    url : "mongodb://localhost:27017",
    dbName : "db_book",
    dbCollection : "key"
}
module.exports = { db_config, db_key };