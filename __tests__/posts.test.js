const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
jest.mock('../lib/services/github');

const agent = request.agent(app);

describe('post routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should get a list of posts if users is authenticated', async () => {
    await agent.get('/api/v1/github/callback?code=123');
    const res = await agent.get('/api/v1/posts');
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      avatar: expect.any(String),
      content: expect.any(String),
      username: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
