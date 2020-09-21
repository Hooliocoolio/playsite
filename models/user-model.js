const db = require("../data/dbconfig");
const uuid = require("uuid");

function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}

async function addUser(user) {
  const id = uuid.v4();
  console.log(id)
  await db("users").insert({ ...user, id });
  return findById(id);
}

function allUsers() {
  return db("users");
}

function findUser(filter) {
  return db("users").select("id", "username", "password", "role").where(filter);
}

function updateUser(changes, id) {
  return db("users").update(changes, password).where({ id });
}

module.exports = {
  findById,
  addUser,
  allUsers,
  findUser,
  updateUser,
};
