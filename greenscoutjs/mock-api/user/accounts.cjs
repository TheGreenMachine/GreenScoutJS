module.exports = (req, res) => {
  const { username } = req.query;

  // Mock database
  const users = {
    Noah: {
      id: 1,
      username: "Noah",
      role: "Admin",
      matchesLogged: 9999999999999,
      pass: "1816",
      age: 17,
    },
    John: {
      id: 2,
      username: "John",
      role: "User",
      matchesLogged: 50,
      pass: "password",
      age: 20,
    },
  };

  const user = users[username];

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
