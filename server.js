require("dotenv").config();

const routes = require("./routes");
const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
