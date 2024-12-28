const bcrypt = require('bcrypt')
const modelUser = require('../models/user')

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
            return res.status(400).json({code:400,success: false, message: 'Akun tidak berhasil ditambahkan'})
        }
        return res.status(200).json({code:200,success: true, message: 'Akun berhasil ditambahkan'})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({code:500,success: false, message: 'Kesalahan server'})
    }

}

module.exports = {register}