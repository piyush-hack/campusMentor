const express = require("express");
const mongoose = require("mongoose");
// const auth = require('./middleware/auth');
const cors = require("cors");
const path = require("path");

const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const app = express();
app.use(cookieParser());
app.use(cors());

mongoose.connect(
  "mongodb+srv://piyush:piyush2001@campusmentor.rxpfd.mongodb.net/test",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("I'm connected to database");
});

app.use(express.json());
// app.use(express.urlencoded({extended:false}));
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/blog-create", (req, res) => {
  res.status(200).render("blog-create");
});

app.get("/blog", (req, res) => {
  params = {"id" : req.query.id}
  res.status(200).render("blog" , params);
});

app.get("/", (req, res) => {
  res.status(200).render("frontpage");
});

app.get("/myprofile", (req, res) => {
  res.status(200).render("teach_profile");
});

app.get("/create_teach_profile", (req, res) => {
  res.status(200).render("create_teach_profile");
});

app.get("/userBlog", (req, res) => {
  username = req.query.username;
  params = {"username" : username}
  res.status(200).render("mycards" , params);
});

app.get("/login", async (req, res) => {
  res.status(200).render("login_page");
});


app.get("/qna", async (req, res) => {
  res.status(200).render("qna");
});

const userrouter = require("./routes/user");
const blogrouter = require("./routes/blog");
const { param } = require("./routes/user");
const teachProfrouter = require("./routes/teachProfile");
const qnarouter = require("./routes/qna");

app.use("/user", userrouter);
app.use("/blog", blogrouter);
app.use("/teachProfile" , teachProfrouter);
app.use("/qa" , qnarouter);




app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`connected to the port ${port}`);
});
