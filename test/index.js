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
    const endpoint = "/posts";
    const posts = db.posts.findAll({
      raw: true,
      include: [
        {
          model: db.users,
          required: true,
        },
      ],
    });
    //exercise
    const res = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(res.body).should.deep.equal(posts);
  });

  it("POST /posts should register TGT", async () => {
    //setup
    const endpoint = "/posts";
    const sampleData = {
      userName: "山田勝己",
      tgts: [
        { tgt: "今日は禁煙できた！" },
        { tgt: "今日は禁煙できた！" },
        { tgt: "今日は禁煙できた！" },
      ],
    }; //TODO determine data format
    //exercise
    const res = await request.post(endpoint).send(sampleData);
    //assertion
    res.should.have.status(201);
    res.should.be.json;
    const tmpData = JSON.parse(res.body);
    const respData = {
      userName: tmpData.userName,
      tgts: tmpData.tgts,
    };
    respData.should.deep.equal(sampleData);
  });
});
