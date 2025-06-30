const express = require('express');
const {MongoClient, ObjectId } = require('mongodb');
const url = "mongodb://localhost:27017";

const app = express();
const client = new MongoClient(url);


const blog = require("./blog");

app.set('view engine','ejs');
app.use(express.static('assets')) // serve static files from 'assets' folder

const about = async ()=>{
    let result =await client.connect();
    let db = result.db('web');
    let collection = db.collection('about');
    let data = await collection.findOne({});
    return(data);
}
const tgsData = async()=>{
    let result =await client.connect();
    let db = result.db('web');
    let collection = db.collection('tags');
    let data =await collection.find({}).toArray();
    console.log(data);
    return data;
}

const recent_post_data = async()=>{
    let result =await client.connect();
    let db = result.db('web');
    let collection = db.collection('recent_post');
    let data = await collection.find({}).toArray();
    return data;
}

const aboutPageData = async()=>{
    let result =await client.connect();
    let db =result.db('web');
    let collection = db.collection('pagecontent');
    let data = await collection.findOne({page: "about"});
    return data;
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
app.get('/',async (r,resp)=>{
    let person = await about();
    let tgs = await tgsData();
    let recent_post = await recent_post_data();
    resp.render('index',{about: person,tags:tgs,blog: blog,rpost : recent_post});
})
app.get('/about',async (r,resp)=>{
    let person = await about();
    let tgs = await tgsData();
    let aboutpage = await aboutPageData();
    let recent_post = await recent_post_data();

    resp.render('about',{about: person,tags:tgs,rpost : recent_post,data : aboutpage});
})
app.get('/contact',async(r,resp)=>{
    let recent_post = await recent_post_data();
    let person = await about();
    let tgs = await tgsData();
    resp.render('contact',{about: person,tags:tgs,rpost : recent_post});
})
app.get('/insert',async(r,resp)=>{
    if(r.query.name && r.query.link){
        let result = await client.connect();
        let db = result.db('web');
        let collection = db.collection('tags');
        let data = await collection.insertOne({
            name: r.query.name,
            link: r.query.link
        });
        if(data.acknowledged){
            console.log("Data Inserted");
            resp.redirect('/insert');
        }else{
            console.log("Data Not Inserted");
        }
        resp.send(data);
    }else{
        resp.render('insert');
    }
})
app.get('/tags',async(r,resp)=>{
    let result = await client.connect();
    let db = result.db('web');
    let collection = db.collection('tags');
    let data = await collection.find({}).toArray();
    resp.render('tags',{tags :data});
})
app.get('/tags/delete/:id',async(r,resp)=>{
    let result = await client.connect();
    let db = result.db('web');
    let collection = db.collection('tags');
    let data = await collection.deleteOne({_id:  new ObjectId(r.params.id)});
    if(data.deletedCount > 0){
        console.log("Data Deleted");
        resp.redirect('/tags');
    }else{
        console.log("Data Not Deleted");
        resp.send("Data Not Deleted");
    }
})
app.get('/tags/edit/:id',async(r,resp)=>{
    let result = await client.connect();
    let db = result.db('web');
    let collection = db.collection('tags');
    let data = await collection.findOne({_id: new ObjectId(r.params.id)});
    if(data){
        resp.render('edittags',{tag: data});
    }else{
        resp.send("Data Not Found");
    }

})
app.get('/tags/update',async(r,resp)=>{
    if(r.query.id && r.query.tagName && r.query.tagLink){
        let result = await client.connect();
        let db = result.db('web');
        let collection = db.collection('tags');
        let data = await collection.updateOne(
            {_id: new ObjectId(r.query.id)},
            {$set: {name: r.query.tagName, link: r.query.tagLink}}
        );
        if(data.modifiedCount > 0){
            console.log("Data Updated");
            resp.redirect('/tags');
        }else{
            console.log("Data Not Updated");
            resp.send("Data Not Updated");
        }
    }else{
        resp.send("Invalid Data");
    }
});

app.listen(5000);