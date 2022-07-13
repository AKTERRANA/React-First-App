const express = require("express");
 const cors = require("cors");
 const mongoose = require("mongoose");
 const bodyParser = require("body-parser");
const app = express();

const Data = require("./model/data.model");
const port = process.env.PORT || 3000;

// MONGODB
const MONGOURL = "mongodb://127.0.0.1/react";
mongoose.connect(MONGOURL).then(()=>{
    console.log("MongoDb is connected Fine.")
}).catch((e)=>{
    console.log("There is an error and The Error is =>",e)
})
// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false})) ;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.get("/test", (req,res)=>{
    console.log("called")
    Data.find().then((resp)=>{
        res.status(200).json(resp)
    }).catch((e)=>{
        res.status(400).json(e)
    })
})

app.post("/add-new", (req, res)=>{
    const newData = new Data({
        title:req.body.title
    })

    newData.save().then((resp)=>{
        console.log("Data saved",resp);
        res.status(200).json({message: "Data is saved Successfully !"})
    }).catch((e)=>{
        console.log("There is an Error and it is =>",e)
    })
})


app.listen(port, ()=>{
    console.log(`Server is running at port =>${port}`)
})










 
 