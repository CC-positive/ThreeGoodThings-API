//testing framework
require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");

//express
const app = require("../app");

//db
const db = require("../models/index");

//chai
chai.use(chaiHttp);
chai.should();

describe("Threetter API Server", () => {
  let request, server;
  before(() => {
    const port = "8080";
    app.set("port", port);
    const http = require("http");
    server = http.createServer(app);
    server.listen(port);
  });

  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });
  afterEach(() => {
    request.close();
  });

  after(() => {
    server.close();
  });

  it("GET /posts should return entire post list", async () => {
    //setup
    const endpoint = "/v1/threetter/posts";
    const posts = await db.posts
      .findAll({
        raw: true,
        order: [[db.tgts, "seq", "ASC"]],
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
        let posts = [];
        for (let post of data) {
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
          } else {
            if (!posts[postsIndex].tgts.id2) {
              posts[postsIndex].tgts.id2 = post["tgts.id"];
              posts[postsIndex].tgts.text2 = post["tgts.tgt"];
            } else {
              posts[postsIndex].tgts.id3 = post["tgts.id"];
              posts[postsIndex].tgts.text3 = post["tgts.tgt"];
            }
          }
        }
        return posts;
      });
    //exercise
    const res = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(JSON.stringify(res.body)).should.deep.equal(posts);
  });

  it("POST /posts should register TGT", async () => {
    //setup
    const endpoint = "/v1/threetter/posts";
    const sampleData = {
      userName: "山田勝己",
      tgt1: "今日は禁煙できた！1",
      tgt2: "今日は禁煙できた！2",
      tgt3: "今日は禁煙できた！3",
    };
    //exercise
    const res = await request.post(endpoint).send(sampleData);
    //assertion
    res.should.have.status(201);
  });

  it("POST /login should return 201 when specicying existence user", async () => {
    //setup
    let deleteUserObj = {
      googleId: "googleIdHogeHoge",
    };
    const endpoint = "/v1/threetter/login";
    const sampleData = {
      googleId: "googleIdHogeHoge",
      userName: "Taro Yamada",
      picture:
        "https://lh3.googleusercontent.com/a-/AOh14GgvPUM3JKBN6ndyP_Yx7I61v-8ArYIh8_D6QnLL=s96-c",
    };
    db.users
      .destroy(deleteUserObj)
      .then(async () => {
        //execution
        const res = await request.post(endpoint).send(sampleData);
        //assertion
        res.should.have.status(201);
      })
      .catch(async () => {
        //execution
        const res = await request.post(endpoint).send(sampleData);
        //assertion
        res.should.have.status(201);
      });
  });

  it("POST /login should return 200 when specicying existence user", async () => {
    //setup
    const endpoint = "/v1/threetter/login";
    const sampleData = {
      googleId: "googleIdHogeHoge",
      userName: "Taro Yamada",
      picture:
        "https://lh3.googleusercontent.com/a-/AOh14GgvPUM3JKBN6ndyP_Yx7I61v-8ArYIh8_D6QnLL=s96-c",
    };
    await request.post(endpoint).send(sampleData);
    //execution
    const res = await request.post(endpoint).send(sampleData);
    //assertion
    res.should.have.status(200);
  });
});
