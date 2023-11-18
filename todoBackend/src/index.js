const express = require("express");
const app = express();
const os = require("os");
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}));

let usersData = {

}

const addData = (username,todo) =>{
    if(usersData[username] == undefined){
     usersData[username] = [todo]

    }else{
        const data = usersData[username];
        data.push(todo);
        usersData[username] = data;
    }
 };

app.get("/",(request,response) =>{
    //root endpoint inorder to get the private IP Address Of The Server
    let interface = os.networkInterfaces();


    response.json({
        message:"Welcome To TODO Web Application",
        address:interface['eth0'],
    });
});

app.post("/addTodo",(request,response) =>{
    //end-point to create TODO's
    addData(request.body.username,request.body.todo);
    response.json({todos:usersData})
});

app.get("/getTodos",(request,response) =>{
    //end-point to get TODO's
    const username = request.query.username;

    response.json({todos:usersData[username]});
});

app.post("/deleteTodo",(request,response) =>{
    //end-point to delete a particular TODO of an user
    const todo = request.body.todo;
    usersData[request.body.username] = usersData[request.body.username].filter(function(val){
        return val != todo;
    });
    response.json({todos:usersData[request.body.username]});
})

app.listen(8080,(error) =>{
    if(!error){
        console.log("SERVER STATED ON http://127.0.0.1:8080");
    }else{
        console.log(error.message);
    }
});
