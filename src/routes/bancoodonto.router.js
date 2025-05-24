const express = require('express')
const bancoodontoController = require('../controllers/bancoodonto.controller')
const router = express.Router()
const {authenticate, authorize } = require('../middlewares/auth')

/**
 * @swagger
 * tags:
 *   name: Registros Odontológicos
 *   description: API para gerenciamento de registros odontológicos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BancoOdonto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do registro odontológico (gerado automaticamente)
 *         tipo:
 *           type: string
 *           enum: [ante-mortem, post-mortem]
 *           description: Tipo de registro odontológico
 *         dataRegistro:
 *           type: string
 *           format: date
 *           description: Data do registro odontológico
 *         caracteristica:
 *           type: string
 *           description: Característica geral do paciente
 *         status:
 *           type: string
 *           enum: [ativo, inativo]
 *           description: Status do registro
 *         tipoDenticao:
 *           type: string
 *           enum: [decídua, permanente, mista]
 *           description: Tipo de dentição do paciente
 *         caracteristicasEspecificas:
 *           type: array
 *           items:
 *             type: string
 *           description: Características odontológicas específicas como implantes, pontes, coroas etc.
 *         regiao:
 *           type: array
 *           items:
 *             type: string
 *           description: Regiões da arcada dentária (ex: anterior, posterior, maxila)
 */

/**
 * @swagger
 * /api/bancoodonto:
 *   post:
 *     summary: Cria um novo registro odontológico
 *     tags: [Registros Odontológicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BancoOdonto'
 *     responses:
 *       201:
 *         description: Registro odontológico adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 bancoOdonto:
 *                   $ref: '#/components/schemas/BancoOdonto'
 *       500:
 *         description: Erro ao adicionar registro odontológico
 */
router.post('/', authenticate, authorize(['admin', 'perito']), bancoodontoController.createBancoodonto)

/**
 * @swagger
 * /api/bancoodonto:
 *   get:
 *     summary: Lista todos os registros odontológicos
 *     tags: [Registros Odontológicos]
 *     responses:
 *       200:
 *         description: Lista de registros odontológicos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BancoOdonto'
 *       500:
 *         description: Erro ao listar os registros odontológicos
 */
router.get('/', authenticate, authorize(['admin', 'perito', 'assistente']), bancoodontoController.getbancoodonto)

/**
 * @swagger
 * /api/bancoodonto/{id}:
 *   get:
 *     summary: Retorna um registro odontológico pelo ID
 *     tags: [Registros Odontológicos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do registro odontológico
 *     responses:
 *       200:
 *         description: Registro odontológico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BancoOdonto'
 *       404:
 *         description: Registro odontológico não encontrado
 *       500:
 *         description: Erro ao buscar registro odontológico
 */
router.get('/:id', authenticate, authorize(['admin', 'perito', 'assistente']), bancoodontoController.getbancoodontoById)

/**
 * @swagger
 * /api/bancoodonto/{id}:
 *   put:
 *     summary: Atualiza um registro odontológico existente
 *     tags: [Registros Odontológicos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do registro odontológico a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BancoOdonto'
 *     responses:
 *       200:
 *         description: Registro odontológico atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedBancoOdonto:
 *                   $ref: '#/components/schemas/BancoOdonto'
 *       400:
 *         description: ID inválido ou registro odontológico não encontrado
 *       500:
 *         description: Erro ao atualizar registro odontológico
 */
router.put('/:id', authenticate, authorize(['admin', 'perito']), bancoodontoController.updatebancoodonto)

/**
 * @swagger
 * /api/bancoodonto/{id}:
 *   delete:
 *     summary: Remove um registro odontológico
 *     tags: [Registros Odontológicos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do registro odontológico a ser removido
 *     responses:
 *       200:
 *         description: Registro odontológico removido com sucesso
 *       404:
 *         description: Registro odontológico não encontrado
 *       500:
 *         description: Erro ao remover registro odontológico
 */
router.delete('/:id', authenticate, authorize(['admin', 'perito']), bancoodontoController.deletebancoodontoById)

/**
 * @swagger
 * /api/bancoodonto:
 *   delete:
 *     summary: Remove todos os registros odontológicos
 *     tags: [Registros Odontológicos]
 *     responses:
 *       200:
 *         description: Todos os registros odontológicos foram removidos com sucesso
 *       500:
 *         description: Erro ao remover registros odontológicos
 */
router.delete('/', authenticate, authorize(['admin']), bancoodontoController.deletebancoodonto)

module.exports = router
