const sqlite3 =require("sqlite3").verbose();
const path = require("path");

let db= new sqlite3.Database("./personnel.db");

db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS emp( name TEXT department TEXT");
});
