const { User } = require("../models");
const jwt = require("jsonwebtoken");

async function index(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal error" });
  }
}

async function show(req, res) {}

async function create(req, res) {}

async function store(req, res) {}

async function edit(req, res) {}

async function update(req, res) {}

async function destroy(req, res) {}

async function token(req, res) {}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  token,
};
