const db = require("../models/index");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // db.users
  // .findAll({
  //   attributes: ["id", "userName", "token", "googleId"],
  //   where: {
  //   },
  // })
  // .then((data) => {
  //   if (data) {
  //     res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
  //   } else {
  //     res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
  //   }
  // });
  // res.render('index', { title: 'Express' });
  
  db.users
  .findOne({
    attributes: ["id"],
    where: {
      userName:"一郎"
    },
  })
  .then((data) => {
    if (data) {
      res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
    } else {
      res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
    }
  });
});

module.exports = router;
