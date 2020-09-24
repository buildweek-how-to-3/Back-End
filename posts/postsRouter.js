const router = require("express").Router();

const Posts = require("./postsModel");
const restricted = require("../auth/restrictedMiddleware");

router.get("/", restricted, (req, res) => {
  Posts.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({ message: "No posts available" });
    });
});

router.get("/:id", restricted, (req, res) => {
  const id = req.params.id;
  Posts.findById(id)

    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error connecting to database.", error });
    });
});

router.get("/users/:id", restricted, (req, res) => {
  const id = req.params.id;
  Posts.findByUserId(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "error ", error });
    });
});

router.post("/users/:id", (req, res) => {
  const { name, category, description } = req.body;
  const userId = req.params.id;
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
  const id = req.params.id;

  Posts.update(changes, id)
    .then((response) => {
      res.status(200).json(response[0]);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error updating posts.", error });
    });
});

router.delete("/:id", restricted, (req, res) => {
  const id = req.params.id;

  Posts.remove(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error deleting posts.", error });
    });
});

module.exports = router;
