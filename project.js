const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (r, resp) => {
  resp.send("<h1>hello world</h1>");
});
app.get("/about", (r, resp) => {
  resp.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us</title>
</head>
<body>
    <h1>About us</h1>
    <p>Lorem ipsum dolor sit amet consectetur.</p>
</body>
</html>
        `);
});
app.get('/api/get',(r,resp)=>{
    resp.send([
        {id:1,name:'sharad'},
        {id:2,name:'shubham'},
        {id:3,name:'jay'},
    ])
})
app.post('/api/post',(r,resp)=>{
    const {name}=r.body;
    resp.send({name:name})
})

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
