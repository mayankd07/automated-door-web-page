const express =require("express");
const path =require("path");
const app =express();
const hbs=require("hbs");
const port =process.env.PORT || 3000;
require("./db/conn");
const Register =require("./models/users");
const static_path=path.join(__dirname, "../public");

app.use(express.static(static_path));

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.post("/register", async (req, res)=>{
    try{
        const password =req.body.password;
        const username =req.body.username;

        const credentials =await Register.findOne({username:username});
        if(credentials.password=== password)
        {
            res.send("You are logged in successfully press back to go to Home page")
        }
        else
        {
            res.send("Password not matching")
        } 
         
    }
    catch(error)
    {
        res.status(400).send("Invalid Credentials" );
        
    }
});
app.get("/", (req, res)=>{
res.send("Error")
});

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);
});