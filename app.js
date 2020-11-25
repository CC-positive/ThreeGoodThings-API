const createError = require("http-errors");
const express = require("express");
let path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fetch = require("node-fetch");

// const { validate } = require("uuid"); //unused vars
const loginRouter = require("./routes/login");
const postsRouter = require("./routes/posts");
const rewardsRouter = require("./routes/rewards");

const app = express();

/**
 * Enable CORS request
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://threetter.tk");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, x-googleid"
  );
  next();
});

app.options("*", (req, res) => {
  // allowed XHR methods
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  res.status(200).end();
});

// Authentication before api execution using Google OAuth2 API
app.use(async (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    next();
    return;
  }
  let idToken;
  if (req.headers["x-auth-token"]) {
    idToken = req.headers["x-auth-token"];
  } else {
    next(createError(403));
    return;
  }
  const validatePath = "https://oauth2.googleapis.com/tokeninfo?id_token=";
  path = validatePath + idToken;
  const authRes = await fetch(path);
  if (authRes.status === 200) {
    // in case of authentication valid
    next();
  } else {
    // in case of authentication invalid
    next(createError(403));
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1/threetter/login", loginRouter);
app.use("/v1/threetter/posts", postsRouter);
app.use("/v1/threetter/rewards", rewardsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
  next();
});

module.exports = app;
