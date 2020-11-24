const express = require('express');
const db = require('../models/index');

const router = express.Router();

/* GET home page. */
router.get('/v1/threetter/posts', (req, res) => {
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

router.get('/v1/threetter/rewards', (req, res, next) => {
  // googleIdよりUserIdを取得し、post配列を取得
  db.users.findOne({ attributes: ['id'], where: { googleId: req.query.googleId } })
    .then((data) => {
      const userId = data.dataValues.id;
      db.posts.findAll({
        where: {
          userId,
        },
        raw: true,
        order: [
          ['date', 'DESC'],
        ],
      }).then((data) => {
      // 変数定義
        const postCondition = {}; // resposeオブジェクト
        let continuous = 0; // 連続投稿数
        const todayRaw = new Date();
        const today = new Date(todayRaw.getFullYear(), todayRaw.getMonth(), todayRaw.getDate());
        let todayPost = 0; // 本日日付のpost有無判定

        // ループ開始
        for (let i = 0; i < data.length; i += 1) {
          let compareDate;

          // postの日付を取得
          const postDate = new Date(
            data[i].date.getFullYear(),
            data[i].date.getMonth(),
            data[i].date.getDate(),
          );

          // 比較日付の設定
          //   posts配列先頭に本日分の投稿があったら比較日付を本日日付に、
          //   本日分の投稿が無かったら比較日付を昨日日付に設定
          if (today.toDateString() === data[0].date.toDateString()) {
            compareDate = new Date(
              todayRaw.getFullYear(),
              todayRaw.getMonth(),
              todayRaw.getDate() - [i],
            );
          } else if (data[i]) {
            compareDate = new Date(
              todayRaw.getFullYear(),
              todayRaw.getMonth(),
              todayRaw.getDate() - [i + 1],
            );
          } else {
            break;
          }

          // 今日日付の投稿があった場合、todayPostに1を挿入
          if (today.toDateString() === postDate.toDateString()) {
            todayPost = 1;
          }

          // 比較日付とpost日付が一致する場合continuousをインクリメント
          if (compareDate.toDateString() === postDate.toDateString()) {
            continuous += 1;
          }
        }

        // responseオブジェクトに要素を追加
        postCondition.continuation = continuous;
        postCondition.today = todayPost;

        if (postCondition) {
          res.set({ 'Access-Control-Allow-Origin': '*' }).send(postCondition).end();
        } else {
          res.set({ 'Access-Control-Allow-Origin': '*' }).status(404).end();
        }
      });
    });
});

/* POST */
router.post('/v1/threetter/posts', (req, res) => {
  const userObj = {
    userName: req.body.userName,
  };
  db.users.create(userObj).then((data1) => {
    const postObj = {
      userId: data1.dataValues.id,
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
  });
});

router.post('/v1/threetter/login', (req, res) => {
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
