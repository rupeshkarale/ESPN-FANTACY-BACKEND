const express = require("express");
const Role = require("../models/role.model");
const roleRouter = express.Router();

roleRouter.post("/role", async (req, res, next) => {
  const { name } = req.body;
  const exist = await Role.exists({ name: name });

  if (name != "user" && name != "admin") {
    return res.send({
      success: false,
      message: `Role ${name} is invalid`,
    });
  }

  if (exist) {
    return res.send({
      success: false,
      message: `Role with ${name} is already present`,
    });
  } else {
    next();
  }
});

// insert role
roleRouter.post("/role", async (req, res) => {
  const role = Role(req.body);
  await role.save();
  res
    .send({
      sucess: true,
      id: role._id,
    })
    .status(201);
});

module.exports = roleRouter;
