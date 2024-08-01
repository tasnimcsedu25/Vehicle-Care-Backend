var mysql =require("mysql");
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Vehicle Care"
});
con.connect(function(error){
    if(error)throw error;
    console.log("connected");
    con.query("select * from user",function(error,result){
        if(error)throw error;
        console.log(result[0]);
    });

});