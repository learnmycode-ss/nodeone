const express = require('express');
const app = express();
const blog = require("./blog");

app.set('view engine','ejs');
app.use(express.static('assets')) // serve static files from 'assets' folder

const about = {
    name : "Sharad Savaliya",
    title : "Software Developer",
    description : "I am a software developer with a passion for creating innovative solutions.",
    social : {
        twiter : "https://x.com/sharad__patel_",
        linkedin : "https://www.linkedin.com/in/savaliya-sharad/",
        github : "https://github.com/learnmycode-ss",
        facebook : "https://www.facebook.com/sharad.savaliya.1",
        instragram: "https://www.instagram.com/sharad14f/"
    }
}
const tgs = [
    {name : "Html", link : "/tag/html"},
    {name : "Css", link : "/tag/css"},
    {name : "JavaScript", link : "/tag/js"},
    {name : "React", link : "/tag/react"},
    {name : "Node", link : "/tag/node"},
    {name : "json", link : "/tag/json"},
]

app.get('/profile',(r,resp)=>{
    const user ={
        name: "Sharad Savaliya",
        email: "sharad@sharadsavaliya.site",
        address: "Amreli, Gujarat",
        hobbies: "Listning audiobook and Story",
        job: "Software Engineer",
        skill: "JavaScript, react, nodeJS, mongoDB"
    }
    resp.render('profile',{user});
})
app.get('/',(r,resp)=>{
    resp.render('index',{about: about,tags:tgs,blog: blog});
})
app.get('/about',(r,resp)=>{
    resp.render('about',{about: about,tags:tgs});
})
app.get('/contact',(r,resp)=>{
    resp.render('contact',{about: about,tags:tgs});
})

app.listen(5000);