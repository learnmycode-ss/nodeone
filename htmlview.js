const express = require('express');
const path = require('path');

const publicFolder = path.join(__dirname,'public');
const app = express();

app.use(express.static(publicFolder));
app.get('/hey',(r,resp)=>{
    resp.sendFile(`${publicFolder}/index.html`);
})
app.get('/home',(r,resp)=>{
    resp.sendFile(`${publicFolder}/test.html`);
})
app.get('/ok',(r,resp)=>{
    resp.sendFile(`${publicFolder}/test2.html`)
})


app.listen(3000,(r,res)=>{
    console.log("http://localhost:3000");
})