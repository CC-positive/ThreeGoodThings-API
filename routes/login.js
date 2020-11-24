const express = require('express');
const db = require('../models/index');

const router = express.Router();

router.post('/', (req, res) => {
  db.users
    .findAll({
      where: {
        googleId: req.body.googleId,
      },
      raw: true,
    })
    .then((data) => {
      if (data.length !== 0) {
        res.status(200).end();
      } else {
        const userObj = {
          googleId: req.body.googleId,
          userName: req.body.userName,
          picture: req.body.picture,
        };
        db.users.create(userObj).then(() => {
          res.status(201).end();
        });
      }
    });
});

module.exports = router;
