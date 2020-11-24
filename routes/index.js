const express = require("express");
const db = require("../models/index");

const router = express.Router();

/* GET home page. */
router.get("/v1/threetter/posts", (req, res) => {
  db.posts
    .findAll({
      where: {},
      raw: true,
      order: [
        ["date", "DESC"],
        [db.tgts, "seq", "ASC"],
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
                id: post["user.id"],
                name: post["user.userName"],
              },
              tgts: {
                id1: post["tgts.id"],
                text1: post["tgts.tgt"],
              },
            };
            posts.push(resPost);
          } else if (!posts[postsIndex].tgts.id2) {
            posts[postsIndex].tgts.id2 = post["tgts.id"];
            posts[postsIndex].tgts.text2 = post["tgts.tgt"];
          } else {
            posts[postsIndex].tgts.id3 = post["tgts.id"];
            posts[postsIndex].tgts.text3 = post["tgts.tgt"];
          }
        });
        res.set({ "Access-Control-Allow-Origin": "*" }).send(posts).end();
      } else {
        res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
      }
    });
});

/* POST */
router.post("/v1/threetter/posts", (req, res) => {
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

router.post("/v1/threetter/login", (req, res) => {
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
