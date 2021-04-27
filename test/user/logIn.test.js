const request = require('supertest');
const app = require('../../app');
const bcrypt = require('bcrypt');

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

describe('Given a POST request to /api/logIn', () => {
  it('when entering correct credentials, then login is successful', async (done) => {
    const email = 'user@email.com';
    const password = 'Qwerty123';

    userDao.saveUser(email, password);

    const credentials = { email: email, password: password };

    request(app)
      .post('/api/logIn')
      .send(credentials)
      .expect((res) => {
        if (res.error) return done(res.error);
        const message = res.body.message;
        const status = res.status;
        expect(status).toBe(201);
        expect(message).toBe('Changed the message');
        return done();
      });

    done();
  });

  it('when entering correct email and incorrect password, then wrong password message', async (done) => {
    const email = 'user@email.com';
    const password = 'Qwerty123';

    userDao.saveUser(email, password);

    const credentials = { email: email, password: 'wrongpassword' };

    request(app)
      .post('/api/logIn')
      .send(credentials)
      .expect((res) => {
        if (res.error) return done(res.error);
        const message = res.body.message;
        const status = res.status;
        expect(status).toBe(201);
        expect(message).toBe('Changed the message');
        return done();
      });

    done();
  });
});
