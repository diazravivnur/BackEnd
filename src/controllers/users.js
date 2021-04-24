let users = [
  {
    id: "1",
    fullName: "spiderman",
    email: "spiderman@gmail.com",
  },
];

exports.getUsers = async (req, res) => {
  try {
    res.send({
      status: "Success",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    const data = req.body;
    users = [...users, data];
    res.send({ users });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
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

    res.send({ status: "success", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
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

    res.send({ status: "success", data: users });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
