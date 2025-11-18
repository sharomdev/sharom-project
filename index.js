const express= require('express');
const mysql=require('mysql2');
const app=express();
const port=3000


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',   
    database: 'pass' 
});

connection.connect((errr)=>{

    if(errr){
        console.log("database connection is failed")
    }
    else{
        console.log("connected to database successfully")
    }
}
)

app.listen(port,()=>{
    console.log(`is listen to http://localhost:${port}`)
})