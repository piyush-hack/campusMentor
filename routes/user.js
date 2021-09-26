const express = require("express");
const USER = require("../models/userModel");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
var google = require("googleapis");
const CryptoJS = require("crypto-js");
const { OAuth2Client } = require("google-auth-library");
const sendmail = require("../middleware/sendmail");
const router = express.Router();

router.get("/getAllUser/:pass", async (req, res) => {
  if (req.params.pass == "cmpiyush") {
    try {
      USER.find({}, function (err, response) {
        if (err) console.log(err);
        res.send(response);
      }).select("-_id");
    } catch (error) {
      res.status(403).send(error);
      console.log(error);
    }
  } else {
    res.send({ msg: "Your are not authorized" });
  }
});

router.post("/getUser/", auth, async (req, res) => {
  try {
    USER.find({ username: req.user.username }, function (err, response) {
      if (err) console.log(err);
      res.send(response);
    }).select("-_id");
  } catch (error) {
    res.status(403).send(error);
    console.log(error);
  }
});

router
  .route("/login")
  .post(
    [
      check("username", "User Name is required").notEmpty(),
      check("password", "password is required").exists(),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const username = req.body.username;
        const password = req.body.password;
        var givenroll = "basic";
        if (req.body.roll != undefined) {
          givenroll = req.body.roll;
        }
        const userfind = await USER.findOne({ username: username });
        if (userfind) {
          let ismatch = await bcrypt.compare(password, userfind.password);
          if (ismatch) {
            let token = await userfind.generateAuthToken(givenroll);
            console.log(token);
            res.status(200).send({ msg: "User succesfully loggedin", token });
          } else {
            res.json({ msg: "password incorrect" });
          }
        } else {
          res.send({ msg: "no user found" });
        }
      } catch (error) {
        console.log(error);
        res.status(401).send({ msg: error });
      }
    }
  );

router
  .route("/register")
  .post(
    [
      check("username", "Name is required").notEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
      }
      try {
        // return res.status(200).send({ msg: "user succesfully login", token })

        const password = req.body.password;
        const cpassword = req.body.confpassword;
        var givenroll = "basic";
        if (req.body.roll != undefined) {
          givenroll = req.body.roll;
        }
        if (password === cpassword) {
          const userdata = new USER({
            roll: givenroll,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          });
          let token = await userdata.generateAuthToken(givenroll);
          await userdata
            .save()
            .then(async () => {
              subject = "Verify Your Account";
              hashPass = await CryptoJS.AES.encrypt(
                req.body.password,
                "verfiy email"
              ).toString();

              console.log("before----------", hashPass);

              hashPass = await encodeURIComponent(hashPass);

              console.log("----------", hashPass);
              mytext = `Click here to verify 
              <a href='http://localhost:3000/user/verify?un=${req.body.username}&hp=${hashPass}'>Verfiy Now</a>
              or http://localhost:3000/user/verify?un=${req.body.username}&hp=${hashPass} paste this link in your browser
              `;
              to = req.body.email;
              var mailResponse = await sendmail(subject, mytext, to);
              res
                .status(200)
                .send({ msg: "user succesfully saved. Check Your Mail For Verfication", token: token });
            })
            .catch((err) => {
              res.status(403).json({ msg: err });
            });
        } else {
          res.send({ msg: "password doesn't match!!" });
        }
      } catch (error) {
        console.log(error);
        res.status(401).send({ msg: error });
      }
    }
  );

router
  .route("/getVerifyMail")
  .post(
    [
      check(
        "password",
        "Please enter a password "
      ).isLength({ min: 6 }),
    ],
    auth,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      try {
        subject = "Verify Your Account";
        console.log("password entered : ", req.body.password);
        hashPass = await CryptoJS.AES.encrypt(
          req.body.password,
          "verfiy email"
        ).toString();
        console.log("before----------", hashPass);
        hashPass = await encodeURIComponent(hashPass);
        console.log("----------", hashPass);
        mytext = ` Verify your mail to Login In Campus Mentor <a href='http://localhost:3000/user/verify?un=${req.user.username}&hp=${hashPass}'>Verfiy Now</a> or
        http://localhost:3000/user/verify?un=${req.user.username}&hp=${hashPass} paste this link in your browser`;
        to = req.user.email;
        var mailResponse = await sendmail(subject, mytext, to);
        res.status(200).send({
          msg: "Mail Sent Check mail For Further Instructions",
          mail: mailResponse,
        });
      } catch (error) {
        console.log({ msg: error });
      }
    }
  );

router.route("/verify").get(async (req, res) => {
  username = req.query.un;
  CryptoJSpassword = CryptoJS.AES.decrypt(req.query.hp, "verfiy email");
  password = CryptoJSpassword.toString(CryptoJS.enc.Utf8);
  console.log("password", password, "----", CryptoJSpassword);

  USER.findOne({ username: username }, async (err, result) => {
    if (err) return res.status(403).send(err);
    // console.log(result);
    let ismatch = await bcrypt.compare(password, result["password"]);

    if (ismatch) {
      USER.findOneAndUpdate(
        { username: username },
        { status: "approved" },
        { new: true },
        async (uerr, updatedresult) => {
          if (uerr) return res.status(403).send(uerr);
          return res.json({ msg: "Account verfied" });
        }
      );
    } else {
      return res.json({ msg: "Verfication Failed. Passord didn't match" });
    }
  }).select("-_id");
  // res.status(200).send({ username: username, password: password });
});

router.get("/logout/", async (req, res) => {
  res.status(200).render("logout");
});

module.exports = router;
