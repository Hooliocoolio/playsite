exports.seed = async function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  await knex("hacks").insert([
    {
      id: 1,
      title: "rowValue1",
      post: "post value1",
      user_id: "ba746c97-7150-4f21-840d-3e9daa598292",
    },
    {
      id: 2,
      title: "rowValue2",
      post: "post value2",
      user_id: "afb615ba-6449-41ba-9c42-2fc24714551a",
    },
    {
      id: 3,
      title: "rowValue3",
      post: "post value2",
      user_id: "299f49e6-b8b9-4d49-92f1-80cc703366a1",
    },
  ]);
};
