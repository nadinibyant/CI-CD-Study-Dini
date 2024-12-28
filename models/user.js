const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const token_user = require('./token_user')

const user = sequelize.define('user', {
    id_user:{
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    username:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(256),
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'user',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

user.hasMany(token_user, {foreignKey: 'id_user', as: 'dataToken'})
token_user.belongsTo(user, {foreignKey: 'id_user', as: 'dataUser'})


module.exports = user