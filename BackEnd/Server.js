const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config() ;
const PORT = process.env.port || 6000;
app.listen(PORT,()=>{console.log(`server start on ${PORT}`)})