const express = require('express');
const mongoose = require('mongoose');
// const auth = require('./middleware/auth');
const cors = require('cors');
const path = require('path');

const cookieParser = require('cookie-parser')
const port = 3000;
const app = express();
app.use(cookieParser())
app.use(cors());





mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/campusmentor', {useNewUrlParser: true, useCreateIndex: true,
useUnifiedTopology: true, useFindAndModify: false});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("I'm connected");
});





app.use(express.json());
// app.use(express.urlencoded({extended:false}));
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get("/blog-create",(req,res)=>{
    res.status(200).render("blog-create");
});

app.get("/blog",(req,res)=>{
    res.status(200).render("blog");
});

app.get("/",(req,res)=>{
    res.status(200).render("frontpage");
});

app.get("/myprojects",(req,res)=>{
    res.status(200).render("myprojects");
});

const userrouter = require('./routes/user')
const blogrouter = require('./routes/blog')

// const profilerouter = require('./routes/profile')
// const sellerrouter = require('./routes/sellerprofile')
// const product = require('./routes/product')

app.use('/user', userrouter);
app.use('/blog', blogrouter);

// app.use('/profile',profilerouter);
// app.use('/sellerprofile',sellerrouter);
// app.use('/products',product);

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(port, ()=>{
    console.log(`connected to the port ${port}`);
});
