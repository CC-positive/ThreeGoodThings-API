const express = require('express');
const { Op } = require('sequelize');
const db = require('../models/index');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  if (req.query.random === undefined) {
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
      }).catch(() => {
        res.status(500).end();
      });
  } else {
    const data1 = await db.users.findAll({
      where: { googleId: req.headers['x-googleid'] },
      raw: true,
    });
    const userId = data1[0].id;

    const data2 = await db.posts
      .findAll({
        where: { userId: { [Op.ne]: userId } },
        raw: true,
        include: [
          {
            model: db.tgts,
            required: true,
          },
        ],
      });
    let num;
    let num1;
    let num2;
    let num3;

    const data3 = await db.likes.findAll();
    const data5 = data3.map((data) => data.tgtId);

    const data6 = data2.filter((data) => data5.indexOf(data['tgts.id'] === -1));

    if (data6.length > 2) {
      num = Math.random() * data6.length;
      num1 = Math.floor(num);

      if (num1 === 0) {
        num2 = num1 + 1;
        num3 = num2 + 1;
      } else if (num1 === data6.length - 1) {
        num2 = num1 - 1;
        num3 = num2 - 2;
      } else {
        num2 = num1 - 1;
        num3 = num2 + 2;
      }

      const tgtsdata = {
        tgts: [{
          id: data6[num1]['tgts.id'],
          text: data6[num1]['tgts.tgt'],
        }, {
          id: data6[num2]['tgts.id'],
          text: data6[num2]['tgts.tgt'],
        }, {
          id: data6[num3]['tgts.id'],
          text: data6[num3]['tgts.tgt'],
        }],
      };

      res.set({ 'Access-Control-Allow-Origin': '*' }).send(tgtsdata).end();
    } else {
      const num = Math.random() * data2.length;
      num1 = Math.floor(num);
      if (num1 === 0) {
        num2 = num1 + 1;
        num3 = num2 + 1;
      } else if (num1 === data2.length - 1) {
        num2 = num1 - 1;
        num3 = num2 - 2;
      } else {
        num2 = num1 - 1;
        num3 = num2 + 2;
      }

      const tgtsdata = {
        tgts: [{
          id: data2[num1]['tgts.id'],
          text: data2[num1]['tgts.tgt'],
        }, {
          id: data2[num2]['tgts.id'],
          text: data2[num2]['tgts.tgt'],
        }, {
          id: data2[num3]['tgts.id'],
          text: data2[num3]['tgts.tgt'],
        }],
      };

      res.set({ 'Access-Control-Allow-Origin': '*' }).send(tgtsdata).end();
    }

    /*
    const data2 = await db.likes.findAll();

     const data3 = await db.posts.findAll({
      where: { userId:{ [Op.ne]:userID }} ,
      raw: true,
    }) ;

    const data4= await db.tgts.findAll({
      where: { postId:data3 },
      raw: true,
    })
 */

    /*
    const data3 = await db.posts.findAll({
        where: { userId:  userId},
        raw: true,
        include:{
          model: db.tgts,
          required: true,
        }
      },
      ) */

    //    exceptPortId=data2.map((data)=>{return data.id});
  }
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
      if (data && today.toDateString() === data.date.toDateString()) {
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
    }).catch(() => {
      res.status(500).end();
    });
  }).catch(() => {
    res.status(500).end();
  });
});

module.exports = router;
