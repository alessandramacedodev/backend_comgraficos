const express = require('express')
const UsuarioController = require('../controllers/user.controller')
// const { authenticate, authorize } = require('../middlewares/auth')
const router = express.Router()


router.post('/', UsuarioController.createUsuario)
router.get('/',UsuarioController.getUsuarios)
router.get('/:id',UsuarioController.getUsuarioById)
router.post('/login',UsuarioController.login)
router.put('/:id',UsuarioController.updateUsuario)
router.delete('/:id',UsuarioController.deleteUsuarioById)
router.delete('/',UsuarioController.deleteUsuarios)

module.exports = router



