const express = require("express");
const app = express();
const router = express.Router();
const teachProfile = require("../models/teacherProfileModel");
const auth = require("../middleware/auth");
app.use(express.static("uploads"));

router.route("/Add").post(auth, (req, res) => {
  const username = req.user.username;
  const myteachProfile = teachProfile({
    name: username,
    ...req.body,
  });
  myteachProfile
    .save()
    .then((result) => {
      res.json({ msg : "Profile Saved Successfully" ,  data: result });
    })
    .catch((err) => {
      console.log(err), res.json({ err: err });
    });
});

router.route("/teachProf/:username").get((req, res) => {
  teachProfile.find({ name: req.params.username }, (err, result) => {
    if (err) return res.status(403).send(err);
    return res.json(result);
  });
});


router.route("/getAllProfiles").get((req, res) => {
  teachProfile.find({}, (err, result) => {
    if (err) return res.json(err);
    return res.json({ data: result });
  });
});

module.exports = router;
