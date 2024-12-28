const request = require('supertest');
const app = require('../app');  
const modelUser = require('../models/user');
const bcrypt = require('bcrypt');

// Mocking Dependencies
jest.mock('../models/user');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

// Mock bcrypt hashSync
bcrypt.hashSync = jest.fn().mockReturnValue('mockHashedPassword');  

// Tes Register
describe('POST /register', () => {
    it('harus mengembalikan 400 jika username atau password kosong', async () => {
        const res = await request(app)
            .post('/register')
            .send({ username: '', password: '' });  // Kirim data kosong

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
        modelUser.findOne = jest.fn().mockResolvedValue(null);  // Simulasi username tidak ada (registrasi bisa dilanjutkan)
        modelUser.create = jest.fn().mockResolvedValue({
            username: 'newdila',
            password: 'mockHashedPassword',  // Simulasi user berhasil dibuat
        });

        const res = await request(app)
            .post('/register')
            .send({ username: 'newdila', password: '1234' });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Akun berhasil ditambahkan');
    });
});
