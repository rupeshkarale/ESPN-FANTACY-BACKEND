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

  const { page, limit } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;

  const teamsForPage = page && limit ? teams.slice(startIndex, endIndex) : teams
  res
    .send({
      sucess: true,
      data: teamsForPage,
    })
    .status(201);
});

module.exports = roleRouter;
