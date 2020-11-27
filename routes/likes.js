const express = require('express');
const AWS = require('aws-sdk');
const db = require('../models/index');

AWS.config.update({ region: 'ap-northeast-1' });
const ses = new AWS.SES();

const router = express.Router();

router.get('/', (req, res) => {
  const ret = {};
  ret.likes = 0;
  ret.likedByMe = false;
  ret.likedUser = [];
  db.users
    .findAll({
      where: { googleId: req.headers['x-googleid'] },
      raw: true,
    }).then((data1) => {
      const userId = data1[0].id;
      db.likes.findAll({
        where: { tgtId: req.query.tgtId },
        raw: true,
      }).then((data2) => {
        const userIds = [];
        data2.forEach((record) => {
          ret.likes += 1;
          if (record.userId === userId) {
            ret.likedByMe = true;
          }
          userIds.push(record.userId);
        });
        db.users.findAll((
          {
            where: { id: userIds },
          }
        )).then((users) => {
          users.forEach((user) => {
            ret.likedUser.push({
              userId: user.dataValues.id,
              userName: user.dataValues.userName,
              picture: user.dataValues.picture,
              email: user.dataValues.email,
            });
          });
        }).then(() => {
          res.set({ 'Access-Control-Allow-Origin': '*' }).send(ret).end();
        });
      }).catch(() => {
        res.status(500).end();
      });
    }).catch(() => {
      res.status(500).end();
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
        const params = {
          Destination: {
            ToAddresses: [
              'threetter@gmail.com',
            ],
          },
          Message: {
            Body: {
              Text: {
                Data: 'これはテストメールです。',
                Charset: 'utf-8',
              },
            },
            Subject: {
              Data: 'テスト',
              Charset: 'utf-8',
            },
          },
          Source: 'threetter@gmail.com',
        };
        ses.sendEmail(params, (error, response) => {
          if (error) {
            console.log(error);
          }
          console.log(response);
        });
        res.status(201).end();
      });
    }).catch(() => {
      res.status(500).end();
    });
});

module.exports = router;
