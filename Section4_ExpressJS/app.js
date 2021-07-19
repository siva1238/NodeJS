const path= require('path');
const express = require("express");
const bp = require("body-parser");

const rootDir = require("./utils/path")
const app = express();



const admin = require("./routes/admin");
const shop = require("./routes/shop")

app.use(bp.urlencoded({extended:false}))

app.use('/admin',admin);
app.use(shop);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','404.html'));
})

app.listen(3000);
