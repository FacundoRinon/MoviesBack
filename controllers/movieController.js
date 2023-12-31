const { User } = require("../models");
const { Movies } = require("../models");
const { MovieUser } = require("../models");
const { Score } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");
const { response } = require("express");

async function index(req, res) {}

async function show(req, res) {
  const id = req.auth.id;
  try {
    const userScored = await Score.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Movies,
          attributes: ["element_id", "media"],
        },
      ],
    });
    const newScored = userScored.map((score) => ({
      score: score.score,
      element_id: score.movie.element_id,
      media: score.movie.media,
    }));
    res.json({ newScored });
  } catch (error) {
    console.log(error);
  }
}

async function create(req, res) {}

async function store(req, res) {}

async function edit(req, res) {}

async function update(req, res) {
  const { user_id, element_id, media, score } = req.body;
  let id;
  try {
    const movieExist = await Movies.findOne({
      where: {
        element_id: element_id,
        media: media,
      },
    });
    if (movieExist) {
      id = movieExist.id;
    } else {
      const newMovie = await Movies.create({
        element_id: element_id,
        media: media,
      });
      id = newMovie.id;
    }
    const scoreExist = await Score.findOne({
      where: {
        user_id: user_id,
        element_id: id,
      },
    });
    if (!scoreExist) {
      const newScore = await Score.create({
        user_id: user_id,
        element_id: id,
        score: score,
      });
      res.json({ newScore });
    } else if (scoreExist) {
      const changeScore = await Score.update(
        {
          score: req.body.score,
        },
        {
          where: {
            user_id: user_id,
            element_id: id,
          },
        },
      );
      const newScore = await Score.findOne({
        where: {
          user_id: user_id,
          element_id: id,
        },
      });
      res.json({ newScore });
    }
  } catch (error) {
    console.log(error);
  }
}

async function destroy(req, res) {}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
