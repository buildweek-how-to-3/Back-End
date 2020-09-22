exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.string("username", 128).notNullable().unique().index();
      tbl.string("password", 255).notNullable();
    })

    .createTable("posts", (tbl) => {
      tbl.increments("id");
      tbl.string("name", 128).notNullable();
      tbl.string("category", 128).notNullable();
      tbl.string("description", 255).notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts").dropTableIfExists("users");
};
