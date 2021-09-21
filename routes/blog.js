const express = require('express');
const app = express();
const router = express.Router();
const BlogPost = require('../models/blogModel');
// const Profile = require('../models/profilModel')
const auth = require('../middleware/auth');
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');
// const multiparty = require('connect-multiparty');

app.use(express.static("uploads"))

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
      res.json({ data: result});
    })
    .catch((err) => {
      console.log(err), res.json({ err: err });
    });
});


router.route("/posts").get(async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startindex = (page - 1) * limit;
  const posts = await BlogPost.find({ }).limit(limit).skip(startindex).exec();
  res.send(posts)
})


router.route("/IdBlog/:id").get((req, res) => {
  BlogPost.findOne({ _id: req.params.id }, (err, result) => {
    if (err) return res.status(403).send(err);
    return res.send(result);
  })
})

router.route("/UserBlog/:username").get((req, res) => {
  BlogPost.find({ username: req.params.username }, (err, result) => {
    if (err) return res.status(403).send(err);
    return res.json(result);
  })
})

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

router.route("/getAllBlog").get(auth, (req, res) => {
  BlogPost.find({ }, (err, result) => {
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

module.exports = router
