const router = require("express").Router();

const Posts = require("./postsModel");
const restricted = require("../auth/restrictedMiddleware");

router.get("/", restricted, (req, res) => {
  Posts.findByUserId(req.decodedToken.subject.id);
  console
    .log(Posts)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error connecting to database.", error });
    });
});

router.post("/", restricted, (req, res) => {
  const post = req.body;
  Posts.create({ ...post, user_id: req.decodedToken })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error connecting to database ", error });
    });
});

router.put("/:id", restricted, (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  Posts.update(changes, id)
    .then((response) => {
      res.status(200).json(response[0]);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating posts.", error });
    });
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.body;

  Posts.remove(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting posts.", error });
    });
});

module.exports = router;
