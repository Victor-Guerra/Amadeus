const request = require('supertest');
const { MongoClient } = require('mongodb');
const app = require('../../app');

const userDao = require('../../dao/userDao');

let mockUsers = [];

// Mock findUserByEmail and saveUser to use mockUsers as database
userDao.findUserByEmail = jest.fn((email) => {
  return new Promise((resolve, reject) => {
    const user = mockUsers.find((obj) => obj.email == email);

    if (user) {
      resolve([user]);
      return;
    }

    reject('Could not find user');
  });
});

userDao.saveUser = jest.fn((email, password) => {
  return new Promise((resolve, reject) => {
    const user = { email: email, password: password };

    mockUsers.push(user);
    resolve(user);
  });
});

describe('Given a POST request to /api/signUp', () => {
  it('when providing a valid email & password, and no user exists with that email, then user should be signed up', async (done) => {
    // Set up mock db collection
    const mockUser = { email: 'user@email.com', password: 'Qwerty123' };

    request(app)
      .post('/api/signUp')
      .send(mockUser)
      .expect((res) => {
        if (res.error) return done(res.error);
        const message = res.body.message;
        const status = res.status;
        expect(status).toBe(201);
        expect(message).toBe('You have created an account.');
        return done();
      });

    done();
  });

  it('when providing invalid email & password, then error message "Invalid email or password" is sent', async (done) => {
    const mockUser = { email: 'invalid email', password: 'invalid password' };

    request(app)
      .post('/api/signUp')
      .send(mockUser)
      .expect((res) => {
        if (res.error) return done(res.error);
        const message = res.body.message;
        const status = res.status;
        expect(status).toBe(409);
        expect(message).toBe('Invalid email or password, please retry');
        return done();
      });

    done();
  });

  it('when providing valid email & password, and user exists with that email, then error message "A user registered with that email already exists" is sent', async (done) => {
    const mockUser = { email: 'user@email.com', password: 'Qwerty123' };

    // First create a new user
    request(app).post('/api/signUp').send(mockUser).expect(201);

    // Make a request with the same user
    request(app)
      .post('/api/signUp')
      .send(mockUser)
      .expect((res) => {
        if (res.error) return done(res.error);
        const message = res.body.message;
        const status = res.status;
        expect(status).toBe(409);
        expect(message).toBe(
          'A user registered with that email already exists'
        );
        return done();
      });

    done();
  });
});
