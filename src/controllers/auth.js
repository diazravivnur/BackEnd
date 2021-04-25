const { users } = require("../../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = req.body;

    const schema = joi.object({
      email: joi.string().email().min(6).required(),
      name: joi.string().min(3).required(),
      password: joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.send({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    }

    const checkEmail = await users.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.send({
        status: "Failed",
        message: "Email Already Registered",
      });
    }

    const hashStrenght = 10;
    const hashedPassword = await bcrypt.hash(password, hashStrenght);

    const dataUser = await users.create({
      ...data,
      password: hashedPassword,
    });
    const secretKey = "myCustomPassword";

    const token = jwt.sign(
      {
        id: checkEmail.id,
      },
      secretKey
    );

    res.send({
      status: "Success",
      data: {
        user: {
          email: dataUser.email,
          fullName: dataUser.name,
          token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
