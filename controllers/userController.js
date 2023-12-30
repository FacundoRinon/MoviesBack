const { User } = require("../models");
const { Movies } = require("../models");
const { MovieUser } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");

if (!process.env.SUPABASE_URL) {
  throw new error("no supabaseUrl");
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
  auth: { persistSession: false },
});

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.json("Invalid credentials");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.json("Invalid credentials");
    }
    const userElements = await MovieUser.findAll({
      where: {
        user_id: user.user_id,
      },
    });
    const elementIds = userElements.map((element) => element.dataValues.element_id);
    const elementsInfo = await Movies.findAll({
      where: {
        id: elementIds,
      },
      attributes: ["element_id", "media"],
    });
    const userFavorites = elementsInfo.map((element) => element.dataValues);
    const token = jwt.sign({ id: user.user_id }, process.env.SESSION_SECRET);
    return res.json({
      token,
      id: user.user_id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      favoriteMovies: userFavorites ? userFavorites : [],
    });
  } catch (error) {
    console.log(error);
  }
}

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

async function store(req, res) {
  const { name, email, password, password2 } = req.body;
  try {
    const emailExist = await User.findOne({
      where: {
        email: email,
      },
    });
    if (password === password2) {
      if (emailExist) {
        return res.json("The email is already registered");
      } else {
        const user = await User.create({
          name: name,
          email: email,
          password: password,
          avatar: "nullAvatar.png",
        });
        const token = jwt.sign(
          {
            id: user.id,
          },
          process.env.SESSION_SECRET,
        );
        return res.json({
          token,
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          favoriteMovies: [],
        });
      }
    } else {
      return res.json("The passwords are diferent");
    }
  } catch (error) {
    console.log(error);
  }
}

async function edit(req, res) {}

async function update(req, res) {
  const { user_id, element_id, media } = req.body;
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

    const relationExist = await MovieUser.findOne({
      where: {
        user_id: user_id,
        element_id: id,
      },
    });
    if (!relationExist) {
      const newRealation = await MovieUser.create({
        user_id: user_id,
        element_id: id,
      });
      const favorites = await Movies.findOne({
        where: {
          id: newRealation.dataValues.element_id,
        },
        attributes: ["element_id", "media"],
      });
      res.json({ favorites });
    } else if (relationExist) {
      const deleteRelation = await MovieUser.destroy({
        where: {
          user_id: user_id,
          element_id: id,
        },
      });
      const favorites = await Movies.findOne({
        where: {
          id: id,
        },
      });
      res.json({ favorites });
    }
  } catch (error) {
    console.log(error);
  }
}

async function destroy(req, res) {}

async function token(req, res) {}

module.exports = {
  login,
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  token,
};
