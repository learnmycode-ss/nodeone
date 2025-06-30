const express = require('express');
const r = express.Router();
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('assets'));
const middle = (r,res,n)=>{
    console.log('middleware');
    n();
}
const testmddle = (req, res, next) => {
    if(req.query.name != 'sharad'){
        res.status(400).send('Please Login');
    }
    next();
}
const middle2 = (req, res, next) => {
    if(!req.query.id) {
        return res.status(400).send('Name query parameter is required');
    }
    next();
}

app.use(middle);
r.use(testmddle);
app.get('/',middle2,(req, res) => {
    res.render('middle');
});

app.get('/team', (req, res) => {
    res.render('team');
});
r.get('/ok',(r,res)=>{
    res.render('team');
})


app.listen(3000, () => {
    console.log('http://localhost:3000');
});