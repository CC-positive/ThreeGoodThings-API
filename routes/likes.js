const express = require('express');
const db = require('../models/index');

const router = express.Router();

router.get('/', (req, res) => {
  db.users
    .findAll({
      where: { googleId: req.headers['x-googleid'] },
      raw: true,
    })
    .then((data1) => {
      const userId = data1[0].id;
      db.likes.findAll({
        where: { tgtId: req.query.tgtId },
        raw: true,
      })
        .then((data2) => {
          const ret = {};
          ret.likes = 0;
          ret.likedByMe = false;
          data2.forEach((record) => {
            ret.likes += 1;
            if (record.userId === userId) {
              ret.likedByMe = true;
            }
          });
          res.set({ 'Access-Control-Allow-Origin': '*' }).send(ret).end();
        });
    });
});

router.post('/', (req, res) => {
  db.users
    .findAll({
      where: { googleId: req.headers['x-googleid'] },
      raw: true,
    })
    .then((data1) => {
      const likeObj = {
        tgtId: req.body.tgtId,
        userId: data1[0].id,
      };
      db.likes.create(likeObj).then(() => {
        res.status(201).end();
      });
    });
});

module.exports = router;
