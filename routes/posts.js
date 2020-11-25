const express = require('express');
const db = require('../models/index');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  db.posts
    .findAll({
      where: {},
      raw: true,
      order: [
        ['date', 'DESC'],
        [db.tgts, 'seq', 'ASC'],
      ],
      include: [
        {
          model: db.users,
          required: true,
        },
        {
          model: db.tgts,
          required: true,
        },
      ],
    })
    .then((data) => {
      if (data) {
        const posts = [];
        data.forEach((post) => {
          const postsIndex = posts.findIndex((p) => p.id === post.id);
          if (postsIndex === -1) {
            const resPost = {
              id: post.id,
              date: post.date.toString(),
              user: {
                id: post['user.id'],
                name: post['user.userName'],
                picture: post['user.picture'],
              },
              tgts: {
                id1: post['tgts.id'],
                text1: post['tgts.tgt'],
              },
            };
            posts.push(resPost);
          } else if (!posts[postsIndex].tgts.id2) {
            posts[postsIndex].tgts.id2 = post['tgts.id'];
            posts[postsIndex].tgts.text2 = post['tgts.tgt'];
          } else {
            posts[postsIndex].tgts.id3 = post['tgts.id'];
            posts[postsIndex].tgts.text3 = post['tgts.tgt'];
          }
        });
        res.set({ 'Access-Control-Allow-Origin': '*' }).send(posts).end();
      } else {
        res.set({ 'Access-Control-Allow-Origin': '*' }).status(404).end();
      }
    });
});

/* POST */
router.post('/', (req, res) => {
  // 既に本日分投稿がないかチェック
  //  ユーザ取得
  db.users.findOne({
    attributes: ['id'],
    where: {
      googleId: req.headers['x-googleid'],
    },
  //  ユーザの最新の投稿を取得
  }).then((data) => {
    const userId = data.dataValues.id;
    db.posts.findOne({
      where: {
        userId,
      },
      raw: true,
      order: [
        ['date', 'DESC'],
      ],
      //  最新投稿が本日分か否か確認
    }).then((data) => {
      const todayRaw = new Date();
      const today = new Date(todayRaw.getFullYear(), todayRaw.getMonth(), todayRaw.getDate());
      if (today.toDateString() === data.date.toDateString()) {
        res.status(422).end(); // 投稿済の場合422を返す
      } else {
        //  最新投稿が本日分でない場合投稿実施
        db.users
          .findAll({
            where: { googleId: req.headers['x-googleid'] },
            raw: true,
          })
          .then((data1) => {
            const postObj = {
              userId: data1[0].id,
              date: new Date(),
            };
            db.posts.create(postObj).then((data2) => {
              const tgtObj1 = {
                postId: data2.dataValues.id,
                tgt: req.body.tgt1,
                seq: 1,
              };
              const tgtObj2 = {
                postId: data2.dataValues.id,
                tgt: req.body.tgt2,
                seq: 2,
              };
              const tgtObj3 = {
                postId: data2.dataValues.id,
                tgt: req.body.tgt3,
                seq: 3,
              };
              Promise.all([
                db.tgts.create(tgtObj1),
                db.tgts.create(tgtObj2),
                db.tgts.create(tgtObj3),
              ]).then(() => {
                res.status(201).end();
              });
            });
          }).catch(() => {
            res.status(500).end();
          });
      }
    });
  }).catch(() => {
    res.status(500).end();
  });
});

module.exports = router;
