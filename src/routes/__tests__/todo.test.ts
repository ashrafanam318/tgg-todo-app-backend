import request from 'supertest';
import expressApp from '../../server';

let token: string;

beforeAll(async () => {
  await request(expressApp).post('/api/auth/register').send({
    username: 'shakil_test1',
    password: '1234rtyu',
  });

  const res = await request(expressApp).post('/api/auth/login').send({
    username: 'shakil_test1',
    password: '1234rtyu',
  });
  token = res.body.token;
});

describe('To-Do routes', () => {
  it('creates a new to-do', async () => {
    const res = await request(expressApp)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'New Task' });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('New Task');
  });

  it('fetches all to-dos for the user', async () => {
    const res = await request(expressApp)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('updates a to-do by id', async () => {
    const todosRes = await request(expressApp)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);

    const res = await request(expressApp)
      .put(`/api/todos/${todosRes.body[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true });
    expect(res.statusCode).toEqual(201);
    expect(res.body.completed).toBe(true);
  });

  it('deletes a to-do by id', async () => {
    const todosRes = await request(expressApp)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);

    const res = await request(expressApp)
      .delete(`/api/todos/${todosRes.body[0]._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);

    const todosResNew = await request(expressApp)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);
    expect(todosResNew.body.length).toBe(0);
  });
});
