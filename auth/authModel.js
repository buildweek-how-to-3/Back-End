const db = require("../data/dbConfig");

module.exports = {
  find,
  create,
  remove,
};

function find(filter) {
  return db("users").where(filter).orderBy("id");
}

function create(user) {
  return db("users").insert(user);
}

function remove(id) {
  return db("users").del({ id });
}

// function getBy(filter) {
//   return db("users").where(filter).orderBy("id");
// }
