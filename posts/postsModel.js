const db = require("../data/dbConfig");

module.exports = {
  findAll,
  findByUserId,
  create,
  remove,
  update,
};

function findAll() {
  return db("posts");
}

function findByUserId(id) {
  return db("posts").where({ user_id: id });
}

function findById(id) {
  return db("posts").where({ id });
}

function create(post) {
  return db("posts")
    .insert(post)
    .then(([id]) => {
      return findById(id).first();
    });
}

function update(changes, id) {
  return db("posts")
    .where({ id })
    .update(changes)
    .then((response) => {
      return findById(id);
    });
}
function remove(id) {
  return db("posts")
    .where({ id })
    .del()

    .then((response) => {
      return findAll();
    })
    .catch((err) => {
      return err;
    });
}
