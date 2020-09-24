const restricted = require("../auth/restrictedMiddleware");
const router = require("express").Router();

const Users = require("./usersModel");

router.get("/users", restricted, (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    });
});
router.get("/users/:id", restricted, (req, res) => {
  const id = req.params.id;
  Users.getBy(id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: "There is no matching id" });
    });
});

router.delete("/users/:id", restricted, (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error Deleteing Users" });
    });
});

module.exports = router;
