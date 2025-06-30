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

const recent_post = [
    {
        link : "one-week-in-arambol-beach",
        title : "One Week in Arambol Beach",
        date : "September 13, 2016",
        img : "content/images/2016/09/rice.jpg"

    },
    {
        link : "nabanna-the-bengali-harvest-celebration",
        title : "Nabanna - The Bengali Harvest Celebration",
        date : "September 13, 2016",
        img : "content/images/2016/09/pocket-watch.jpg"

    },
    {
        link : "time-passes-faster-than-you-thik",
        title : "Time Passes Faster Than You Thik",
        date : "September 13, 2016",
        img : "content/images/2016/09/poster.jpg"

    },
]
const aboutpage = {
    content : `  <p>
                      <strong>Borsha</strong> is a minimal and reader friendly
                      theme for <a href="http://ghost.org/">Ghost</a> blogging
                      platform. it is designed focusing content in mind. So that
                      visitor and reader can concentrate in your article. There
                      is no clutter and over bloating unnecessary element
                      throughout the design.
                    </p>
                    <p>
                      This theme handles rich media like image, video and audio
                      in a nice way. An code highlighter is also included in
                      this theme for those people who write code block and
                      coding tutorial.
                    </p>
                    <p>
                      Also in this theme there is a very simple but powerful
                      inbuilt feature which allow you to use any embedded media
                      like
                      <strong
                        >YouTube video, Vimeo video, Sound cloud audio, Mix
                        cloud audio or any other embedded iframe as your
                        featured / or cover media to your post or static
                        page.</strong
                      >
                      Oh! also embedded <strong>google map</strong> can be used
                      at the place of featured media. Working example of google
                      map is on the
                      <a href="../contact/index.html">contact</a> page.
                    </p>
                    <p>
                      So If you are going to start a new site and looking for a
                      nice ghost theme for your magazine, multi-author blog,
                      journal or personal blog, <strong>Borsha</strong> will
                      perfectly fit in your need.
                    </p>
                    <p>
                      We will keep updating this theme time to time. If you find
                      any bug or want a feature in a future version please let
                      me know. Will try best to solve / add those in future
                      version.
                    </p>`,
}
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
    resp.render('index',{about: about,tags:tgs,blog: blog,rpost : recent_post});
})
app.get('/about',(r,resp)=>{
    resp.render('about',{about: about,tags:tgs,rpost : recent_post,data : aboutpage});
})
app.get('/contact',(r,resp)=>{
    resp.render('contact',{about: about,tags:tgs,rpost : recent_post});
})

app.listen(5000);