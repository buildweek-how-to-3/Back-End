const db = require("../data/dbConfig");

module.exports = {
  get,
  add,
  getBy,
  remove,
};

function get() {
  return db("users");
}

function add(user) {
  return db("users").insert(user);
}
function getBy(id) {
  return db("users").where({ id }).first();
}

function remove(id) {
  return db("users")
    .where({ id })
    .del()

    .then((response) => {
      return findAll();
    })
    .catch((err) => {
      return err;
    });
}
