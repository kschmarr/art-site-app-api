const ArtService = {
  getAllArt(knex) {
    return knex.select("*").from("art");
  },
  getById(knex, id) {
    return knex("art")
      .where("mealid", id)
      .first();
  },
  updateArt(knex, artid, new_fields) {
    return knex("art")
      .where({ artid })
      .update(new_fields)
      .returning("*");
  },
  deleteArt(knex, mealid) {
    return knex("art")
      .where({ mealid })
      .del()
      .returning("*");
  },
  insertArt(knex, new_art) {
    return knex
      .insert(new_art)
      .into("art")
      .returning("*");
  },
  getOneArt(knex, artid) {
    return knex
      .from("art")
      .select("*")
      .where({ artid })
      .first();
  },
  getAllUsers(knex) {
    return knex.select("*").from("users");
  },
  getOneUser(knex, userid) {
    return knex
      .from("users")
      .select("*")
      .where({ userid })
      .first();
  },
  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into("users")
      .returning("*")
      .then(rows => {
        return rows;
      });
  },
  updateUser(knex, userid, new_user_fields) {
    return knex("users")
      .where({ userid })
      .update(new_user_fields)
      .returning("*");
  },
  deleteUser(knex, userid) {
    return knex("users")
      .where({ userid })
      .del();
  }
};

module.exports = ArtService;
