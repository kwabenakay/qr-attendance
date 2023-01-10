const sqlite3 =require("sqlite3").verbose();
const path = require("path");
const data = require("./pub/data.json");
const dbName=data.currentDb;//will be set current db name in data.json file
let db= new sqlite3.Database("./db/"+dbName+".db");
let date = new Date();
let colName =date.getDate()+""+ (date.getMonth()+1);



//creating table
db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS staff (name text, department text);");
});

function input(name, department,time, sect){
    let checker
    db.serialize(()=>{
        checker= db.run("SELECT COUNT(*) AS CNTREC FROM "+dbName+"('staff') WHERE name='"+colName+"login';");
    });
    if(checker>0){
        //write
        dbwrite(name, department,time, sect);
    }
    else{
        db.serialize(()=>{db.run("ALTER TABLE staff ADD "+colName+"login TEXT;")});
        db.serialize(()=>{db.run("ALTER TABLE staff ADD "+colName+"logout TEXT;")});
        //write
        dbwrite(name, department,time, sect);
    }
}
function dbwrite(name, department,time, sect){
    
        db.serialize(()=>{
            if(sect=="am"){
            db.run("UPDATE staff SET "+colName+"login ='"+time+" WHERE name="+name+" AND department="+ department+"' TEXT;")
            }
            else{                
            db.run("UPDATE staff SET "+colName+"logout ='"+time+" WHERE name="+name+" AND department="+ department+"' TEXT;")
            }
        });
}
//set db to populate next year
function setup(year){
    //update current year db
    data.year=year;
    data.currentDb="personnel"+year;
    //create db for new year
    let newdb= new sqlite3.Database("./db/person"+year+".db");
    db.serialize(()=>{
        db.run("create table if not exists staff (name text, department text);");
    });
    //cleaning the current staff obj for new staff
    data.currentStaff.length=0;

    
}
// populate db with new staff
function dbsetup(name,department){
    db.serialize(()=>{db.run("INSERT INTO staff (name,department) VALUES("+name+","+department+");")});
    //adding new entries to the staff obj
    data.currentStaff.push({"name": name,"department":department});
}