const express = require('express')
const casoController = require('../controllers/caso.controller')

const router = express.Router()


router.post('/', casoController.createCaso)
router.get('/',casoController.getCaso)
router.get('/:id',casoController.getCasoById)
router.put('/:id',casoController.updateCaso)
router.delete('/:id',casoController.deleteCasoById)
router.delete('/',casoController.deleteCaso)

module.exports = router


    