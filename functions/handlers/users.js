const { admin, db } = require("../util/admin");

const config = require("../util/config/UAT/config.js");

const { v4: uuid_v4 } = require("uuid");
const { validateLoginData, validateSignupData } = require("../util/validators");
const firebase = require("firebase");
firebase.initializeApp(config);

//Function to signup user
exports.signup = (req, res) => {
  const newUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    gender: req.body.gender,
    weight: req.body.weight,
    height: req.body.height,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);
  let token, userId;
  db.doc(`/users/${newUser.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ email: "This email is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        fullName: newUser.fullName,
        email: newUser.email,
        weight: newUser.weight,
        height: newUser.height,
        gender: newUser.gender,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.email}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else {
        return res
          .status(500)
          .json({ general: "Something went wrong, please try again" });
      }
    });
};

//Login User
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "Wrong credentials, please try again" });
      } else return res.status(500).json({ error: err.code });
    });
};
