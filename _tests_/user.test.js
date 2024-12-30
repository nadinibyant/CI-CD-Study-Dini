const request = require('supertest');
const app = require('../app');
const modelUser = require('../models/user');
const bcrypt = require('bcrypt');

// Mocking Dependencies
jest.mock('../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.setTimeout(10000);

// Mock bcrypt hashSync
bcrypt.hashSync = jest.fn().mockReturnValue('mockHashedPassword');

const db = require('../config/db');

beforeAll(async () => {
    await db.authenticate();
  });

  afterAll(async () => {
    await db.close();
  });

  beforeEach(async () => {
    // Clear database atau setup data test
    await db.sync({ force: true });
  });


// Tes Register
describe('POST /register', () => {
    it('harus mengembalikan 400 jika username atau password kosong', async () => {
        const res = await request(app)
            .post('/register')
            .send({ username: "", password: "" });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Silahkan lengkapi inputan anda');
    });

    it('harus mengembalikan 400 jika username sudah terpakai', async () => {
        modelUser.findOne = jest.fn().mockResolvedValue(true);  // Simulasi user sudah ada

        const res = await request(app)
            .post('/register')
            .send({ username: 'dini', password: '1234' });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Username telah digunakan');
    });

    it('harus mengembalikan 200 dan pesan sukses ketika registrasi berhasil', async () => {
        modelUser.findOne = jest.fn().mockResolvedValue(null);  // Simulasi username tidak ada
        modelUser.create = jest.fn().mockResolvedValue({
            username: 'newdila',
            password: 'mockHashedPassword',
        });

        const res = await request(app)
            .post('/register')
            .send({ username: 'newdila', password: '1234' });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Akun berhasil ditambahkan');
    });
});
