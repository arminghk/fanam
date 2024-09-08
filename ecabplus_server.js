const app = require("express")();
const http = require("http").createServer(app);
const express = require("express");
const path = require("path");

require('./database/Connection/db');



app.listen(3000,()=>{
    console.log('server is running on port 3000');
})