// testing framework
require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

// express
const http = require('http');
const app = require('../app');

// db
const db = require('../models/index');

// chai
chai.use(chaiHttp);
chai.should();
// const expect = chai.expect;

describe('Threetter API Server', () => {
  let request;
  let server;
  before(() => {
    const port = '8080';
    app.set('port', port);
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

  it('GET /posts should return entire post list', async () => {
    // setup
    const endpoint = '/v1/threetter/posts';
    const posts = await db.posts
      .findAll({
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
        const postsArray = [];
        data.forEach((post) => {
          const postsIndex = postsArray.findIndex((p) => p.id === post.id);
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
            postsArray.push(resPost);
          } else if (!postsArray[postsIndex].tgts.id2) {
            postsArray[postsIndex].tgts.id2 = post['tgts.id'];
            postsArray[postsIndex].tgts.text2 = post['tgts.tgt'];
          } else {
            postsArray[postsIndex].tgts.id3 = post['tgts.id'];
            postsArray[postsIndex].tgts.text3 = post['tgts.tgt'];
          }
        });
        return postsArray;
      });
    // exercise
    const res = await request.get(endpoint);
    // assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(JSON.stringify(res.body)).should.deep.equal(posts);
  });

  // get rewardテスト
  // 一昨日分＋昨日分＋本日分の3日分までpost済のパターン (連続：３ 当日投稿あり)
  it('GET /reward should return entire post continuation number', async () => {
    // setup
    // seedファイルがある前提
    const endpoint = '/v1/threetter/rewards';
    const target = 'hogegoogleid1';
    const expect = {
      continuation: 3,
      today: 1,
    };
    // exercise
    const res = await request.get(endpoint).set({ 'x-googleid': target });
    // assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(JSON.stringify(res.body)).should.deep.equal(expect);
  });

  // 昨日分＋本日分＋12日前分がpost済のパターン（連続：２ 当日投稿あり）
  it('GET /reward should return entire post continuation number(non continuous post pattern)', async () => {
    // setup
    // seedファイルがある前提
    const endpoint = '/v1/threetter/rewards';
    const target = 'hogegoogleid2';
    const expect = {
      continuation: 2,
      today: 1,
    };
    // exercise
    const res = await request.get(endpoint).set({ 'x-googleid': target });
    // assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(JSON.stringify(res.body)).should.deep.equal(expect);
  });

  // 一昨日分＋昨日分がpost済のパターン（連続：２ 当日投稿無し）
  it('GET /reward should return entire post continuation number(no today post pattern)', async () => {
    // setup
    // seedファイルがある前提
    const endpoint = '/v1/threetter/rewards';
    const target = 'hogegoogleid3';
    const expect = {
      continuation: 2,
      today: 0,
    };
    // exercise
    const res = await request.get(endpoint).set({ 'x-googleid': target });
    // assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(JSON.stringify(res.body)).should.deep.equal(expect);
  });
  // 13日前分＋12日前分＋一昨日分＋昨日分＋本日分がpost済のパターン（連続：３＋昔に２ 当日投稿あり）
  // ⇒過去の連続を拾っていないことを確認するテスト
  it('GET /reward should return entire post continuation number(past 3 pattern)', async () => {
    // setup
    // seedファイルがある前提
    const endpoint = '/v1/threetter/rewards';
    const target = 'hogegoogleid4';
    const expect = {
      continuation: 3,
      today: 1,
    };
    // exercise
    const res = await request.get(endpoint).set({ 'x-googleid': target });
    // assertion
    res.should.have.status(200);
    res.should.be.json;
    JSON.parse(JSON.stringify(res.body)).should.deep.equal(expect);
  });

  // post投稿テスト
  it('POST /posts should register TGT', async () => {
    // setup
    const endpoint = '/v1/threetter/posts';
    const sampleData = {
      userName: '山田勝己',
      tgt1: '今日は禁煙できた！1',
      tgt2: '今日は禁煙できた！2',
      tgt3: '今日は禁煙できた！3',
    };
    // 三郎(hogegoogleid3)は本日分を投稿していないため201となる想定
    const res = await request.post(endpoint).set('x-googleid', 'hogegoogleid3').send(sampleData);
    res.should.have.status(201);
  });

  // 本日分二重投稿回避テスト
  it('POST /posts should reject posting TGT if todays post does exist', async () => {
    // setup
    const endpoint = '/v1/threetter/posts';
    const sampleData = {
      userName: '山田勝己',
      tgt1: '今日は禁煙できた！1',
      tgt2: '今日は禁煙できた！2',
      tgt3: '今日は禁煙できた！3',
    };
    // 先のテストで三郎(hogegoogleid3)は本日分を投稿したため422となる想定
    const res = await request.post(endpoint).set('x-googleid', 'hogegoogleid3').send(sampleData);
    res.should.have.status(422);
  });

  // ユーザが存在しない場合はユーザを作成し201を返す
  it('POST /login should return 201 when specicying existence user', async () => {
    // setup
    const deleteUserObj = {
      googleId: 'googleIdHogeHoge',
    };
    const endpoint = '/v1/threetter/login';
    const sampleData = {
      googleId: 'googleIdHogeHoge',
      userName: 'Taro Yamada',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GgvPUM3JKBN6ndyP_Yx7I61v-8ArYIh8_D6QnLL=s96-c',
    };
    db.users
      .destroy(deleteUserObj)
      .then(async () => {
        // execution
        const res = await request.post(endpoint).send(sampleData);
        // assertion
        res.should.have.status(201);
      })
      .catch(async () => {
        // execution
        const res = await request.post(endpoint).send(sampleData);
        // assertion
        res.should.have.status(201);
      });
  });

  // ユーザが存在する場合はユーザを作成せず200を返す
  it('POST /login should return 200 when specicying existence user', async () => {
    // setup
    const endpoint = '/v1/threetter/login';
    const sampleData = {
      googleId: 'googleIdHogeHoge',
      userName: 'Taro Yamada',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GgvPUM3JKBN6ndyP_Yx7I61v-8ArYIh8_D6QnLL=s96-c',
    };
    await request.post(endpoint).send(sampleData);
    // execution
    const res = await request.post(endpoint).send(sampleData);
    // assertion
    res.should.have.status(200);
  });

  it('GET /likes should return like number', async () => {
    // setup
    // seedファイルがある前提
    const resultTgt1 = await db.tgts.findOne({ raw: true, attributes: ['id'], where: { tgt: '一郎のいいこと1-1' } });
    const endpoint = `/v1/threetter/likes?tgtId=${resultTgt1.id}`;
    const target = 'hogegoogleid1';
    // const expect = {
    //   likes: 2,
    //   likedByMe: true,
    //   likedUser: [
    //     {
    //       email: 'hoge@hoge.com',
    //       picture: 'hogetoken',
    //       userId: 'd8457734-f741-406f-b098-b093dee7616e',
    //       userName: '一郎',
    //     },
    //     {
    //       email: 'fuga@fuga.com',
    //       picture: 'hogetoken',
    //       userId: '6cbcdc2b-093c-4291-b774-a3c212d3553d',
    //       userName: '二郎',
    //     },
    //   ],
    // };
    // exercise
    const res = await request.get(endpoint).set({ 'x-googleid': target });
    // assertion
    res.should.have.status(200);
    res.should.be.json;
    // JSON.parse(JSON.stringify(res.body)).should.deep.equal(expect);
  });

  it('POST /posts should register TGT', async () => {
    // setup
    const endpoint = '/v1/threetter/likes';
    const resultTgt1 = await db.tgts.findOne({ raw: true, attributes: ['id'], where: { tgt: '一郎のいいこと1-2' } });
    const sampleData = {
      tgtId: resultTgt1.id,
    };
    const res = await request.post(endpoint).set('x-googleid', 'hogegoogleid1').send(sampleData);
    res.should.have.status(201);
  });

  it('GET /posts should return entire post list', async () => {
    // setup
    const endpoint = '/v1/threetter/posts/?random=3';
    // exercise
    const res = await request.get(endpoint).set({ 'x-googleid': 'hogegoogleid1' });
    // assertion
    res.should.have.status(200);
  });
});
