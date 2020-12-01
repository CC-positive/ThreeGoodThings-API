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
  let likedUserName;
  let likedtgt;
  db.users
    .findAll({
      where: { googleId: req.headers['x-googleid'] },
      raw: true,
    })
    .then((data1) => {
      likedUserName = data1[0].userName;
      const likeObj = {
        tgtId: req.body.tgtId,
        userId: data1[0].id,
      };
      db.likes.create(likeObj).then(() => {
        db.tgts
          .findOne({
            where: { id: req.body.tgtId },
          }).then((tgt) => {
            likedtgt = tgt.tgt;
            db.posts.findOne({
              where: { id: tgt.postId },
            }).then((post) => {
              db.users.findOne({
                where: { id: post.userId },
              }).then((user) => {
                const params = {
                  Destination: {
                    ToAddresses: [
                      user.email,
                    ],
                  },
                  Message: {
                    Body: {
                      Text: {
                        Data: `${likedUserName}さんがあなたの投稿「${likedtgt}」にいいねしました。`,
                        Charset: 'utf-8',
                      },
                    },
                    Subject: {
                      Data: `${likedUserName}さんがあなたの投稿にいいねしました`,
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
            });
          });
      });
    }).catch(() => {
      res.status(500).end();
    });
});

module.exports = router;
