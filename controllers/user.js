const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const modelUser = require('../models/user')
const modelTokenUser = require('../models/token_user')

//register
const register = async (req,res) => {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(400).json({code:400, success: false, message: 'Silahkan lengkapi inputan anda'})
        } 
        const findUser = await modelUser.findOne({where: {username: username}})
        if (findUser) {
            return res.status(400).json({code:400, success: false, message: 'Username telah digunakan'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPass = bcrypt.hashSync(password, salt)
        const addAdmin = await modelUser.create({
            username: username,
            password: hashedPass
        })
        if (!addAdmin) {
            return res.status(400).json({code:400,success: false, message: 'Akun admin tidak berhasil ditambahkan'})
        }
        return res.status(200).json({code:200,success: true, message: 'Akun admin berhasil ditambahkan'})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500,success: false, message: 'Kesalahan server'})
    }

}

//login 
const login = async (req,res) => {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(400).json({code:400,success: false, message: 'Silahkan lengkapi data akun anda'})
        }
        const findUser = await modelUser.findOne({where: {username: username}})
        if (!findUser) {
            return res.status(400).json({code:400,success: false, message: 'Username akun tidak ditemukan'})
        }

        bcrypt.compare(password, findUser.password, async (err, results) => {
            if (err || !results) {
                return res.status(400).json({code:400,success: false, message: 'Password akun anda salah'})
            }
            const id_user = findUser.id_user
            const token = jwt.sign(
                {
                     id_user
                },
                process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1w'
                }
            )
            await modelTokenUser.create({
                token: token,
                id_user: id_user
            })
            return res.status(200).json({code:200,success: true, message: 'Login berhasil', token: token})
        })        
    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500,success:false, message: 'Kesalahan server'})
    }
    
}

module.exports = {login, register}