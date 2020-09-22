const router = require("express").Router();

const Posts = require("./postsModel");
const restricted = require("../auth/restrictedMiddleware");

router.get("/allposts", restricted, (req, res) => {
  Posts.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: "No posts available" });
    });
});

router.get("/", restricted, (req, res) => {
  const { id } = req.params;
  Posts.findByUserId(id)

    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error connecting to database.", error });
    });
});

router.post("/", restricted, (req, res) => {
  const { name, category, description, user_id } = req.body;
  const userId = req.jwt.subject;
  Posts.create({ name, category, description, user_id: userId })
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
