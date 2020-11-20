const db = require("../models/index");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/posts', function(req, res, next) {
  db.posts.findAll({
    where: {
    },
    raw: true,
    include: [
      {
        model: db.users,
        required: true
      },
      //somehow cannot join tgts...
      // {
      //   model: db.tgts,
      //   required: true
      // }
    ]
  }).then((data)=>{
    if (data) {
      res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
    } else {
      res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
    }
  })
});

/* POST */
router.post('/posts', function(req, res, next) {
  res.type("application/json");
  res.status(201).end();
});

module.exports = router;
