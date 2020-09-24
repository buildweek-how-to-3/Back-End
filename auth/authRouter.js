const router = require("express").Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../auth/authModel");

router.post("/register", (req, res) => {
  // new users able to register before signing in
  const user = req.body;
  const isValid = validateUser(user);

  if (isValid) {
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    Users.create(user)
      .then((newUser) => {
        const token = makeJwt(newUser);
        res.status(201).json({ data: newUser, token });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res
      .status(400)
      .json({ message: "Invalid Information, Please Verify and Try again!" });
  }
});

router.post("/login", (req, res) => {
  // users is able to login after register here.
  const creds = req.body;
  const isValid = validateCredentials(creds);

  if (isValid) {
    Users.find({ username: creds.username })
      .then(([user]) => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          // comparing the token to see if its a match and can login
          const token = makeJwt(user);
          res.status(200).json({ message: "Login Successful", token });
        } else {
          res.status(401).json({
            message:
              "You don't have right credentials. Please check and try again!!",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({ message: "invalid info" });
  }
});

// middlware
function validateUser(user) {
  // validating username and password here.
  return user.username && user.password ? true : false;
}
function validateCredentials(creds) {
  return creds.username && creds.password ? true : false;
}

function makeJwt({ id, username }) {
  //
  const payload = {
    username,
    subject: id,
  };
  const config = {
    jwtSecret: process.env.JWT_SECRET || "Tero Tauko",
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, config.jwtSecret, options);
}

module.exports = router;
