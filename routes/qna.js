const express = require("express");
const app = express();
const router = express.Router();
const QnaPost = require("../models/qnaModel");
const auth = require("../middleware/auth");
const { check, validationResult, param } = require("express-validator");

router.use("/static", express.static("static"));
router.use(express.urlencoded({ extended: true }));


router
  .route("/Add")
  .post([check("title", "Title is required ").notEmpty()], auth, (req, res) => {
    const qnaPost = QnaPost({
      username: req.user.username,
      catagory: req.body.catagory,
      title: req.body.title,
      tags: req.body.tags,
      body: req.body.content,
    });
    qnaPost
      .save()
      .then((result) => {
        res.json({ data: result });
      })
      .catch((err) => {
        console.log(err), res.json({ err: err });
      });
  });

router.route("/posts").get(auth, async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startindex = (page - 1) * limit;
  const posts = await QnaPost.find({}).limit(limit).skip(startindex).exec();
  posts[posts.length] = req.user.username;
  res.send(posts);
});

router.route("/IdQna/:id").get((req, res) => {
  QnaPost.findOne({ _id: req.params.id }, (err, result) => {
    if (err) return res.status(403).send(err);
    return res.send(result);
  });
});

router.route("/UserBlog/:username").get((req, res) => {
  QnaPost.find({ username: req.params.username }, (err, result) => {
    if (err) return res.status(403).send(err);
    return res.json(result);
  });
});

router.route("/like/").post(auth, async (req, res) => {
  if (req.user.status != "approved") {
    return res.send({
      err: {
        message:
          "Please approve your account first by Mail Verfication To Move Further",
      },
    });
  }

  await QnaPost.findOneAndUpdate(
    { _id: req.body.id },
    { $pull: { dislikes: req.user.username } }
  ).exec();

  await QnaPost.findOneAndUpdate(
    { _id: req.body.id },
    { $addToSet: { likes: req.user.username } },
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

router.route("/dislike/").post(auth, async (req, res) => {
  if (req.user.status != "approved") {
    return res.send({
      err: {
        message:
          "Please approve your account first by Mail Verfication To Move Further",
      },
    });
  }

  await QnaPost.findOneAndUpdate(
    { _id: req.body.id },
    { $pull: { likes: req.user.username } }
  ).exec();

  try {
    await QnaPost.findOneAndUpdate(
      { _id: req.body.id },
      { $addToSet: { dislikes: req.user.username } },
      (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
      }
    );
  } catch (error) {
    return res.json(error);
  }
});

router.route("/answer/:title").get(async (req, res) => {
  QnaPost.findOneAndUpdate(
    { title: req.params.title },
    { $inc: { views: 1 } },
    { new: true },
    (err, result) => {
      if (err) return res.status(403).send(err);
      var params = { result: JSON.stringify(result) };
      return res.status(200).render("questionpage", params);
    }
  );
});

router.route("/addReply/").post(auth, async (req, res) => {
  if (req.user.status != "approved") {
    return res.send({
      err: {
        message:
          "Please approve your account first by Mail Verfication To Move Further",
      },
    });
  }

  await QnaPost.findOneAndUpdate(
    { title: req.body.title },
    {
      $addToSet: {
        Replies: req.body.reply,
      },
    },
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

router.route("/editReply/").post(auth, async (req, res) => {
  if (req.user.status != "approved") {
    return res.send({
      err: {
        message:
          "Please approve your account first by Mail Verfication To Move Further",
      },
    });
  }

  await QnaPost.updateOne(
    { 'Replies.time': req.body.reply.replyid },
    { '$set': {
      'Replies.$.contentDetails': req.body.reply.contentDetails,
  }
    },
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

router.route("/deleteReply/").post(auth, async (req, res) => {
  if (req.user.status != "approved") {
    return res.send({
      err: {
        message:
          "Please approve your account first by Mail Verfication To Move Further",
      },
    });
  }

  console.log(decodeURIComponent(req.body.title))
  await QnaPost.updateOne(
    {
      title: decodeURIComponent(req.body.title),
    },
    {
      $pull: {
        "Replies": {time : req.body.deleteid},
      },
    },
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );

});

router.route("/likeReply/").post(auth, async (req, res) => {
  if (req.user.status != "approved") {
    return res.send({
      err: {
        message:
          "Please approve your account first by Mail Verfication To Move Further",
      },
    });
  }

  await QnaPost.updateOne(
    {
      title: req.body.id,
      "Replies.time": req.body.replyid,
    },
    {
      $pull: {
        "Replies.$.dislikes": req.user.username,
      },
    }
  ).exec();

  await QnaPost.updateOne(
    {
      title: req.body.id,
      "Replies.time": req.body.replyid,
    },
    {
      $addToSet: {
        "Replies.$.likes": req.user.username,
      },
    },
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

router.route("/dislikeReply/").post(auth, async (req, res) => {
  if (req.user.status != "approved") {
    return res.send({
      err: {
        message:
          "Please approve your account first by Mail Verfication To Move Further",
      },
    });
  }

  await QnaPost.updateOne(
    {
      title: req.body.id,
      "Replies.time": req.body.replyid,
    },
    {
      $pull: {
        "Replies.$.likes": req.user.username,
      },
    }
  ).exec();

  await QnaPost.updateOne(
    {
      title: req.body.id,
      "Replies.time": req.body.replyid,
    },
    {
      $addToSet: {
        "Replies.$.dislikes": req.user.username,
      },
    },
    (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    }
  );
});

module.exports = router;
