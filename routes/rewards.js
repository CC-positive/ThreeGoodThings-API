const express = require('express');
const db = require('../models/index');

const router = express.Router();

router.get('/', (req, res) => {
  // googleIdよりUserIdを取得し、post配列を取得
  db.users.findOne({ attributes: ['id'], where: { googleId: req.headers['x-googleid'] } })
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
          } else {
            break;
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
      }).catch(() => {
        res.status(500).end();
      });
    }).catch(() => {
      res.status(500).end();
    });
});

module.exports = router;
