const express = require("express");
const matches = require('../data/match.json')
const teams = require('../data/team.json')
const roleRouter = express.Router();

roleRouter.get("/matches", async (req, res) => {
  res
    .send({
      sucess: true,
      data: matches,
    })
    .status(201);
});
roleRouter.get("/teams", async (req, res) => {

  res
    .send({
      sucess: true,
      data: teams,
    })
    .status(201);
});

module.exports = roleRouter;
