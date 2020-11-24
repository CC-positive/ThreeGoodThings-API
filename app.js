var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fetch = require("node-fetch");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const { validate } = require("uuid");

var app = express();

/**
 * Enable CORS request
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://18.181.45.23:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

// Authentication before api execution using Google OAuth2 API
app.use(async (req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    next();
    return;
  }
  let id_token;
  if (req.headers["x-auth-token"]) {
    id_token = req.headers["x-auth-token"];
  } else {
    next(createError(403));
    return;
  }
  let validatePath = "https://oauth2.googleapis.com/tokeninfo?id_token=";
  path = validatePath + id_token;
  let authRes = await fetch(path);
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

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

function getOptions(verb, data) {
  var options = {
    dataType: "json",
    method: verb,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
}
