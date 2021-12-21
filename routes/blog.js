const express = require("express");
const app = express();
const router = express.Router();
const BlogPost = require("../models/blogModel");
const auth = require("../middleware/auth");
const Razorpay = require("razorpay");

app.use(express.static("uploads"));

let instance = new Razorpay({
  key_id: "rzp_test_O7q0EhSlhM8o2B", // your `KEY_ID`
  key_secret: "U4iA3CaZoEwZEP8lXa4OVid6", // your `KEY_SECRET`
});

router.route("/api/payment/order").post((req, res) => {
  params = req.body;
  instance.orders
    .create(params)
    .then((data) => {
      res.send({ sub: data, status: "success" });
    })
    .catch((error) => {
      res.send({ sub: error, status: "failed" });
    });
});

router.route("/api/payment/verify").post(auth, (req, res) => {
  body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", "U4iA3CaZoEwZEP8lXa4OVid6")
    .update(body.toString())
    .digest("hex");
  console.log("sig" + req.body.razorpay_signature);
  console.log("sig" + expectedSignature);
  var response = { status: "failure" };
  if (expectedSignature === req.body.razorpay_signature) {
    response = { status: "success" };
    BlogPost.update(
      { _id: req.body.blog_id },
      { $addToSet: { accessTo: req.user.username } },
      (err, result) => {
        if (err) return res.status(403).send(err);
        return console.log(result);
      }
    );
  }
  res.send(response);
});

router.route("/Add").post(auth, (req, res) => {
  const blogpost = BlogPost({
    coverImage: req.body.coverImage,
    username: req.user.username,
    catagory: req.body.catagory,
    title: req.body.title,
    subheading: req.body.subheading,
    tags: req.body.tags,
    body: req.body.body,
  });
  blogpost
    .save()
    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err), res.json({ err: err });
    });
});

router.route("/posts").get(async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startindex = (page - 1) * limit;
  const posts = await BlogPost.find({}).limit(limit).skip(startindex).exec();
  res.send(posts);
});

router.route("/cmpiyush_visitors/:id").get(async (req, res) => {
  const visitors = await BlogPost.find(
    { _id: req.params.id },
    "visitors"
  ).exec();
  res.send(visitors);
});

router.route("/IdBlog/:id").get( (req, res) => {

  BlogPost.findOne({ _id: req.params.id }, (err, result) => {
    if (err) return res.status(403).send(err);
    return res.send(result);
  });
});

router.route("/UserBlog/:username").get((req, res) => {

  let query = {};

  if( req.params.username && req.params.username != 'undefined' && req.params.username != 'All'){
    query = { username: req.params.username }
  }

  console.log(req.params.username , query);
  BlogPost.find(query, (err, result) => {
    if (err) return res.status(403).send(err);
    return res.json(result);
  });
});

router.route("/getOwnBlog").get(auth, (req, res) => {
  BlogPost.find({ username: req.user.username }, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

router.route("/getOtherBlog").get(auth, (req, res) => {
  BlogPost.find({ username: { $ne: req.user.username } }, (err, result) => {
    if (err) return res.json(err);
    return res.json({ data: result });
  });
});

router.route("/getAllBlog").get((req, res) => {
  BlogPost.find({}, (err, result) => {
    if (err) return res.json(err);
    return res.json({ data: result });
  });
});

router.route("/delete/:id").delete(auth, (req, res) => {
  BlogPost.findOneAndDelete(
    {
      $and: [{ username: req.user.username }, { _id: req.params.id }],
    },
    (err, result) => {
      if (err) return res.json(err);
      else if (result) {
        console.log(result);
        return res.json("Blog deleted");
      }
      return res.json("Blog not deleted");
    }
  );
});

router.route("/like/").post(auth, (req, res) => {

  if (req.user.status != "approved") {
    return res.send({
      verifymailerr:
        "Please approve your account first by Mail Verfication To Move Further",
    });
  }
  BlogPost.findOneAndUpdate(
    {_id :req.body.id}, {$addToSet : {'likes' : req.user.username}},
    (err, result) => {
      if (err) return res.json(err);
      else if (result) {
        // console.log(result);
        return res.json("liked");
      }
      return res.json("nliked");
    }
  );
});

router.route("/dislike/").post(auth, (req, res) => {
  if (req.user.status != "approved") {
    return res.send({
      verifymailerr:
        "Please approve your account first by Mail Verfication To Move Further",
    });
  }

  BlogPost.findOneAndUpdate(
    {_id :req.body.id}, {$pull : {'likes' : req.user.username}},
    (err, result) => {
      if (err) return res.json(err);
      else if (result) {
        // console.log(result);
        return res.json("disliked");
      }
      return res.json("ndisliked");
    }
  );
});


module.exports = router;
