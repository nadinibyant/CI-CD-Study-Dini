const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const token_user = sequelize.define('token_user', {
    id_token: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    id_user:{
        type: DataTypes.UUID,
        allowNull: false
    },
    token:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    expires_at:{
        type: DataTypes.DATE,
        defaultValue: () => new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
    }
}, {
    tableName: 'token_user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = token_user