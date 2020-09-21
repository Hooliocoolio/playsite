exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  await knex("hacks").insert([
    { id: 1, title: "rowValue1", post: "post value1", user_id: "1" },
    { id: 2, title: "rowValue2", post: "post value2", user_id: "2" },
    { id: 3, title: "rowValue3", post: "post value2", user_id: "3" },
  ]);
};
