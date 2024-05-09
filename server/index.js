const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const PORT = 8080;
const securekey = "ABC";
const Users = require("./models/usersModel");

mongoose.connect("mongodb+srv://Abhishek:Abhishek@cluster0.mjob4sx.mongodb.net/Todo-app?retryWrites=true&w=majority&appName=Cluster0")
.then(console.log("Database connected"));

app.use(cors());
app.use(express.json())


app.post("/users/register",async(req,res) => {

    const userExists = await Users.findOne({email:req.body.email});

    if(!userExists){
        try{
            const securePassword = await bcrypt.hash(req.body.password,10);

            const user = await Users.create({
                email:req.body.email,
                password:securePassword
            })

            const data = {user:user.id};
            const token = await jwt.sign(data,securekey);

            res.send({
                status:200,
                message:"Succefully registered",
                token,
                user
            })

        }catch(err){
            res.send({
                status:400,
                message: err.message
            }) 
        }

    }else{
        res.send({
            status:400,
            message:"User already registered, please signIn"
        })
    }
})

app.post("/users/signIn",async(req,res) => {

    const userExists = await Users.findOne({email:req.body.email});

    if(userExists){
        try{
            const comparePassword = await bcrypt.compare(req.body.password,userExists.password)

            if(comparePassword){
                const data = {user:userExists.id}
                const token = await jwt.sign(data,securekey);
                
                res.send({
                    status:200,
                    userExists,
                    token
                })
            }else {
                res.send({
                    status:400,
                    message:"Invalid credentials"
                })
            }
        }catch(err){
            res.send({
                status:400,
                message: err.message
            })
        }
    }else {
        res.send({
            status:400,
            message: "User not registered, please register"
        })
    }
})

app.listen(PORT,() => {console.log(`App is listening on ${PORT}`)})

