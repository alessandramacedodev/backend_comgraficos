const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true, 
        trim: true
    },
    email: {
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    senha: {
        type: String,
        required: true,
    },
    perfil:{
        type: String,
        enum: ['admin','perito','assistente'],
        default: 'assistente'
    }
})
//seguerança da senha 
usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next()
    const salt = await bcrypt.genSalt(10)
    this.senha = await bcrypt.hash(this.senha, salt)
    next()
})

//gera JWT
usuarioSchema.methods.generateTokenJWT = function() {
    const jwt = require('jsonwebtoken')
    return jwt.sign(
        {id: this._id, perfil: this.perfil},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '1d'}
    )
}


const Usuario = mongoose.model ('Usuario', usuarioSchema)
module.exports = Usuario
