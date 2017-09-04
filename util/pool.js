const { Pool } = require("pg");
const dbconfig = require("../config/database");

var dbPool;
/**
 * Singleton DB Pool instance
 */
const pool = () => {
    if(!dbPool){
        dbPool = new Pool(dbconfig);
        console.log("Database pool created");
    }

    return dbPool;
}

module.exports = pool();
