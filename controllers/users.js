const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation, auth } = require("./validation");

// CREATE A USER  -- localhost:PORT/users/register
router.post("/register", async (req, res) => {
  const { error } = await registerValidation.validate(req.body);
  if (error)
    return res
      .status(400)
      .send(`Validation Error: ${error.details[0].message}`);
  // Password Hashing
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  // CREATE USER AND ADD TO THE DB
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPass,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ Error: error, message: "Could Not Get Users from MongoDB" });
  }
});

router.put("/edit/:userID", async (req, res) => {
  const { error } = await registerValidation.validate(req.body);
  if (error)
    return res
      .status(400)
      .send(`Validation Error: ${error.details[0].message}`);

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userID },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
        },
      },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    res.json({ error: error, message: "Could Not Update MongoDB" });
  }
});

router.put("/editPassword/:userID", async (req, res) => {
  console.log(req.params.userID, req.body.oldPassword, req.body.newPassword);

  const user = await User.findById(req.params.userID);
  const validPass = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!validPass) {
    console.log("Error: Incorrect Password!");
    return res.status(400).json("Şifre Hatalı Girildi");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.newPassword, salt);
  try {
    const edit = await User.findOneAndUpdate(
      { _id: req.params.userID },
      {
        $set: {
          password: hashPass,
        },
      },
      { new: true }
    );
    res.send(edit);
  } catch (error) {
    res.json({ error: error, message: "Could Not Update MongoDB" });
  }
});

router.get(`/delete/:userID`, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userID);
    console.log(user);
    res.json({
      message: "User is deleted successfully from Mongo DB. ",
      user: user,
    });
  } catch (error) {
    res.json({ message: "Error on User Deletion: ", Error: error });
  }
});

// LOGIN --  localhost:PORT/users/login
router.post("/login", async (req, res) => {
  // INPUT VALIDATION
  const { error } = loginValidation.validate(req.body.info);
  if (error) {
    return res.status(400).json(error);
  }
  // USERNAME VERIFICATION
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    console.log("Error: User Not Found");
    return res.status(404).json("Kullanıcı Bulunamadı");
  }
  // PASSWORD VERIFICATION
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    console.log("Error: Incorrect Password!");
    return res.status(400).json("Şifre Hatalı Girildi");
  }
  res.json(user);
  return res.status(200);
});

module.exports = router;
