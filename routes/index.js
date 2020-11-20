const db = require("../models/index");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/v1/threetter/posts', function(req, res, next) {
  db.posts.findAll({
    where: {
    },
    raw: true,
    order: [
      [db.tgts, 'seq', 'ASC']
    ],
    include: [
      {
        model: db.users,
        required: true
      },
      {
        model: db.tgts,
        required: true,
      }
    ]
  }).then((data)=>{
    if (data) {
      let posts = [];
      for (post of data) {
        const postsIndex = posts.findIndex((p) => p.id === post.id);
        if (postsIndex === -1) {
          const resPost = {
            id: post.id,
            date: post.date.toString(),
            user: {
              id: post['user.id'],
              name: post['user.userName']
            },
            tgts: {
              id1: post['tgts.id'],
              text1: post['tgts.tgt'],
            },
          };
          posts.push(resPost);
        } else {
          if (!posts[postsIndex].tgts.id2) {
            posts[postsIndex].tgts.id2 = post['tgts.id'];
            posts[postsIndex].tgts.text2 = post['tgts.tgt'];
          } else {
            posts[postsIndex].tgts.id3 = post['tgts.id'];
            posts[postsIndex].tgts.text3 = post['tgts.tgt'];
          }
        }
      }
      res.set({ "Access-Control-Allow-Origin": "*" }).send(posts).end();
    }else {
      res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
    }
  })
});

/* POST */
router.post('/v1/threetter/posts', function(req, res, next) {
  let userObj = {
    userName : req.body.userName
  }
  db.users.create(userObj).then((data1)=>{
    let postObj = {
      userId: data1.dataValues.id,
      date: new Date()
    }
    db.posts.create(postObj).then((data2)=>{
      let tgtObj1 = {
        postId: data2.dataValues.id,
        tgt: req.body.tgt1,
        seq:1
      };
      let tgtObj2 = {
        postId: data2.dataValues.id,
        tgt: req.body.tgt2,
        seq:2
      };
      let tgtObj3 = {
        postId: data2.dataValues.id,
        tgt: req.body.tgt3,
        seq:3
      };
      Promise.all([
        db.tgts.create(tgtObj1),
        db.tgts.create(tgtObj2),
        db.tgts.create(tgtObj3)
      ]).then((results)=>{
        res.status(201).end();
      })
    })
  })
});
module.exports = router;
