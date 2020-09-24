exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  await knex("posts").insert([
    {
      id: 1,
      title: "rowValue1",
      post: "post value1",
      author: "userone",
    },
    {
      id: 2,
      title: "rowValue2",
      post: "post value2",
      author: "userone",
    },
    {
      id: 3,
      title: "rowValue3",
      post: "post value2",
      author: "usertwo",
    },
  ]);
};
