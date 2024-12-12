import request from 'supertest';
import expressApp from '../../server';

describe('Auth routes', () => {
  it('registers a new user', async () => {
    const res = await request(expressApp).post('/api/auth/register').send({
      username: 'shakil_test1',
      password: '1234rtyu',
    });
    expect(res.statusCode).toEqual(201);
  });

  it('prevents duplicate user registration', async () => {
    const res = await request(expressApp).post('/api/auth/register').send({
      username: 'shakil_test1',
      password: '1234rtyu',
    });
    expect(res.statusCode).toEqual(400);
  });

  it('returns token for a valid user', async () => {
    const res = await request(expressApp).post('/api/auth/login').send({
      username: 'shakil_test1',
      password: '1234rtyu',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
