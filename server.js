const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

let users = [
  {
    id: 1,
    fullName: "spiderman",
    email: "spiderman@gmail.com",
  },
];

app.get("/users", (req, res) => {
  res.send({
    status: "Success",
    users,
  });
});

app.post("/user", (req, res) => {
  const data = req.body;
  users = [...users, data];
  res.send({ users });
});

app.patch("/user/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const checkUser = users.find((data) => data.id == id);

  if (!checkUser) {
    return res.send({
      status: "failed",
      message: "data Not Found",
    });
  }

  users = users.map((user) => {
    if (user.id == id) {
      return id, data;
    } else {
      return user;
    }
  });

  res.send({ users });
});

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  const checkUser = users.find((data) => data.id == id);

  if (!checkUser) {
    return res.send({
      status: "failed",
      message: "data Not Found",
    });
  }

  users = users.filter((user) => user.id != id);

  res.send({
    status: "success",
    data: {
      id: id,
    },
  });
});
app.listen(port, () => console.log(`Running on port ${port}`));
