const Usuario = require ('../models/usuario')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const createUsuario = async (req,res) => {
    try {
        const user = new Usuario ({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            perfil: req.body.perfil
        })
        await user.save()
        res.status(201).json({message: 'Usuário cadastrado com sucesso!', user: user})
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err)
        res.status(500).json({error: 'Erro ao cadastrar usuário.', details: err.message})
    }
}

const getUsuarios = async (req, res) => {
    try {
        const users = await Usuario.find().select('-senha')
        res.status(200).json(users)
    } catch (err) {
        console.error('Erro ao listar usuários:', err)
        res.status(500).json({error: 'Erro ao listar usuários.'})
    }
}

const getUsuarioById = async (req, res) => {
    const {id} = req.params
    if (!id || id.trim() === '') {
        return res.status(400).json({message: `ID não fornecido na URL da requisição.`})
    }
    try {
        const user = await Usuario.findById(id).select('-senha')
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: `Usuário não encontrado com essa id=${id}.`})
        }
    } catch (err) {
        console.error('Erro ao encontrar usuário:', err)
        res.status(500).json({error: 'Erro ao encontrar usuário.'})
    }
}

const login = async (req, res) => {
    const {email, senha} = req.body
    try {
        const user = await Usuario.findOne({email})
        if(!user)
            return res.status(400).json({message: 'Usuário não encontrado'})
        const isMatch = await bcrypt.compare(senha, user.senha)
        if(!isMatch)
            return res.status(400).json({message: 'Senha incorreta'})
        const token = user.generateTokenJWT()
        res.status(200).json({
            message: 'Login bem-sucedido',
            user: {
                id: user._id,
                nome: user.nome,
                email: user.email,
                perfil: user.perfil
            },
            token
        })
    } catch (err) {
        console.error('Erro ao realizar login:', err)
        res.status(500).json({error: 'Erro ao realizar login'})
    }
}

//atualizar usuario 
const updateUsuario = async (req, res) => {
    const {id} = req.params
    if(req.body.senha && req.body.senha .trim() !=='') {
        req.body.senha  = await bcrypt.hash(req.body.senha , 10)
    } else {
        delete req.body.senha 
    }
    try {
        const updatedUsuario = await Usuario.findByIdAndUpdate(
            {_id: id},
            req.body,
            {new: true}
        )
        if(!updatedUsuario) {
            return res.status(404).json({message: `Usuário não encontrado com essa id=${id}.`})
        }
        const userResponse = updatedUsuario.toObject()
        delete userResponse.senha 
        res.status(200).json({message: 'Usuário atualizado com sucesso!', updatedUsuario: userResponse})
    } catch (err) {
        console.error('Erro ao atualizar usuário:', err)
        res.status(500).json({error: 'Erro ao atualizar usuário.'})
    }
}


const deleteUsuarioById = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: 'ID inválido'})
    }
    
    try {
        const deletedUsuario = await Usuario.deleteOne({_id: id})
        if(deletedUsuario.deletedCount === 0) {
          return  res.status(404).json({message: `Nenhum usuário encontrado com essa id=${id}.`})
        }

        res.status(200).json({message: `Usuário com ID=${id} foi deletado com sucesso!`})
    } catch (err) {
        console.error('Erro ao deletar usuário:', err)
        res.status(500).json({error: 'Erro ao deletar usuário.'})
    }
}

const deleteUsuarios = async (req, res) => {
    try {
        if (req.user.perfil !== 'admin') {
            return res.status(403).json({ message: 'Acesso negado. Somente administradores podem deletar todos os usuários.' })
        }
        const deletedUsuarios = await Usuario.deleteMany()
        res.status(200).json({message: 'Todos os usuários foram deletados com sucesso!', 
        deletedCount: deletedUsuarios.deletedCount})
    } catch (err) {
        console.error('Erro ao deletar todos os usuários:', err)
        res.status(500).json({error: 'Erro ao deletar todos os usuários.'})
    }
}


module.exports = {
    createUsuario,
    getUsuarios,
    getUsuarioById,
    login,
    updateUsuario,
    deleteUsuarioById,
    deleteUsuarios
}