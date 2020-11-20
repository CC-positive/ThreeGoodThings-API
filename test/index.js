//testing framework
require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");

//express
const app = require("../app");

//chai
chai.use(chaiHttp);
chai.should();

describe.skip("threetter API Server", () => {
  let request, server;
  before(() => {
    const port = "3000";
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
  it.skip("GET /posts should return entire post list", async () => {
    //setup
    const endpoint = "/posts";
    //exercise
    const res = await request.get(endpoint);
    //assertion
    res.should.have.status(200);
    res.should.be.json;
    /* TODO get ideal response */
  });

  it.skip("POST /posts should register TGT", async () => {
    //setup
    const endpoint = "/posts";
    const sampleData = {}; //TODO determine data format
    //exercise
    const res = await request.post(endpoint).send(sampleData);
    //assertion
    res.should.have.status(201);
    res.should.be.json;
    /* TODO get ideal response */
  });
});
