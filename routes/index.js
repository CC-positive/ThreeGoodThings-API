const db = require("../models/index");
var express = require('express');
var router = express.Router();
const posts = require("../models/posts")
const tgts = require("../models/tgts")

/* GET home page. */
router.get('/posts', function(req, res, next) {
  db.posts.findAll({
    where: {
    },
    raw: true,
    include: [
      {
        model: db.users,
        required: true
      },
      //somehow cannot join tgts...
      // {
      //   model: db.tgts,
      //   required: true
      // }
    ]
  }).then((data)=>{
    if (data) {
      res.set({ "Access-Control-Allow-Origin": "*" }).send(data).end();
    } else {
      res.set({ "Access-Control-Allow-Origin": "*" }).status(404).end();
    }
  })
});

/* POST */
router.post('/posts', function(req, res, next) {

  let postObj = {
    user_id: "111",
    date: new Date()
  }
  db.posts.create(postObj).then((data)=>{
    console.log(data)
    let tgtObj1 = {
      postId: data.dataValues.id,
      tgt: "111"
    }
    db.tgts.create(tgtObj1).then((data)=>{
      let tgtObj2 = {
        postId: data.dataValues.id,
        tgt: "222"
      }
      db.tgts.create(tgtObj2).then((data)=>{
        let tgtObj3 = {
          postId: data.dataValues.id,
          tgt: "333"
        }  
        db.tgts.create(tgtObj3).then((data)=>{
          res.status(201).end();
      })
  })
});

// router.post('/posts', function(req, res, next) {

//   let postObj = {
//     user_id: "111",
//     date: new Date()
//   }
//   db.posts.create(postObj, {isNewRecord:true}).complete(function(err, result) {
//       if(err){
//         console.log("aaa")
//         // callback(0);
//       }else{
//         const resultId = result.id;
//         db.tgts.create(postObj, {isNewRecord:true}).complete(function(err, result) {
//             if(err){
//             }else{
//             db.tgts.bulkCreate([{
//               post_id: resultId,
//               tgt:"aaa"        
//             },{
//               post_id: resultId,
//               tgt:"bbb"
//             },{
//               post_id: resultId,
//               tgt:"ccc"
//             }]) 
//             }
//           }
//         )
//       }
//     }
//   )
//   res.status(201).end();
// });

module.exports = router;
