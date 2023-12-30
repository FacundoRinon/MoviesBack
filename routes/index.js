const userRoutes = require("../routes/userRoutes");
const movieRoutes = require("../routes/movieRoutes");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/movie", movieRoutes);
};
