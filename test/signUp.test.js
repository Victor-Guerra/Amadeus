const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../app');

describe('Given a POST request to /api/signUp', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await db.close();
    await connection.close();
  });

  it('when providing a valid email & password, and no user exists with that email, then user should be signed up', async (done) => {
    // Set up mock db collection
    const users = db.collection('users');

    const mockUser = { email: 'user@email.com', password: 'Qwerty123' };

    request(app)
      .post('/api/signUp')
      .send(mockUser)
      .expect(201, { message: 'You have created an account.' });

    done();
  });

  it('when providing invalid email & password, then error message "Invalid email or password" is sent', async (done) => {
    const mockUser = { email: 'invalid email', password: 'invalid password' };

    request(app)
      .post('/api/signUp')
      .send(mockUser)
      .expect(409, { message: 'Invalid email or password, please retry' });

    done();
  });

  it('when providing valid email & password, and user exists with that email, then error message "A user registered with that email already exists" is sent', async (done) => {
    const mockUser = { email: 'user@email.com', password: 'Qwerty123' };

    // First create a new user
    request(app).post('/api/signUp').send(mockUser).expect(201);

    // Make a request with the same user
    request(app).post('/api/signUp').send(mockUser).expect(409, {
      message: 'A user registered with that email already exists',
    });

    done();
  });
});
