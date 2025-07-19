const request = require('supertest');
const app = require('../../server');

describe('Bug API', () => {
  it('GET /api/health should return status 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('API is running');
  });
});
