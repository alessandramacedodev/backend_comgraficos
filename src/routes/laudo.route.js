const express = require('express')
const laudoController = require('../controllers/laudo.controller') // Nome padronizado
const router = express.Router()
const { authenticate, authorize } = require('../middlewares/auth')

/**
 * @swagger
 * tags:
 *   name: Laudos
 *   description: API para gerenciamento de laudos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ConteudoLaudo:
 *       type: object
 *       properties:
 *         introducao:
 *           type: string
 *           description: Introdução do laudo
 *         metodologia:
 *           type: string
 *           description: Metodologia utilizada no laudo
 *         analiseEresultados:
 *           type: string
 *           description: Resultados da análise do laudo
 *         conclusao:
 *           type: string
 *           description: Conclusão do laudo
 *     Laudo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID do laudo (gerado automaticamente)
 *         tituloLaudo:
 *           type: string
 *           description: Título do laudo
 *         numeroLaudo:
 *           type: string
 *           description: Número de identificação do laudo
 *         dataEmissao:
 *           type: string
 *           format: date
 *           description: Data de emissão do laudo
 *         tipoLaudo:
 *           type: string
 *           enum: [Preliminar, Final]
 *           description: Tipo do laudo
 *         conteudoLaudo:
 *           $ref: '#/components/schemas/ConteudoLaudo'
 *         expertResponsible:
 *           type: string
 *           description: ID do usuário responsável pelo laudo
 *         evidence:
 *           type: string
 *           description: ID da evidência associada ao laudo
 */

/**
 * @swagger
 * /api/laudos:
 *   post:
 *     summary: Cria um novo laudo
 *     tags: [Laudos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Laudo'
 *     responses:
 *       201:
 *         description: Laudo adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 laudo:
 *                   $ref: '#/components/schemas/Laudo'
 *       500:
 *         description: Erro ao adicionar laudo
 */
router.post('/', authenticate, authorize(['admin', 'perito']), laudoController.createlaudo)

/**
 * @swagger
 * /api/laudos:
 *   get:
 *     summary: Lista todos os laudos
 *     tags: [Laudos]
 *     responses:
 *       200:
 *         description: Lista de laudos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Laudo'
 *       500:
 *         description: Erro ao listar os laudos
 */
router.get('/', authenticate, authorize(['admin', 'perito', 'assistente']), laudoController.getlaudo)

/**
 * @swagger
 * /api/laudos/{id}:
 *   get:
 *     summary: Retorna um laudo pelo ID
 *     tags: [Laudos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo
 *     responses:
 *       200:
 *         description: Laudo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Laudo'
 *       404:
 *         description: Laudo não encontrado
 *       500:
 *         description: Erro ao buscar laudo
 */
router.get('/:id', authenticate, authorize(['admin', 'perito', 'assistente']), laudoController.getlaudoById)

/**
 * @swagger
 * /api/laudos/{id}/pdf:
 *   get:
 *     summary: Gera um PDF de um laudo
 *     tags: [Laudos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo para gerar o PDF
 *     responses:
 *       200:
 *         description: PDF do laudo gerado com sucesso
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: byte
 *       404:
 *         description: Laudo não encontrado
 *       500:
 *         description: Erro ao gerar PDF do laudo
 */
router.get('/:id/pdf', authenticate, authorize(['admin', 'perito']), laudoController.generatelaudoPdf)

/**
 * @swagger
 * /api/laudos/{id}:
 *   put:
 *     summary: Atualiza um laudo existente
 *     tags: [Laudos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Laudo'
 *     responses:
 *       200:
 *         description: Laudo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 updatedLaudo:
 *                   $ref: '#/components/schemas/Laudo'
 *       400:
 *         description: ID inválido ou laudo não encontrado
 *       500:
 *         description: Erro ao atualizar laudo
 */
router.put('/:id', authenticate, authorize(['admin', 'perito']), laudoController.updatelaudo)

/**
 * @swagger
 * /api/laudos/{id}:
 *   delete:
 *     summary: Deleta um laudo pelo ID
 *     tags: [Laudos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do laudo a ser deletado
 *     responses:
 *       200:
 *         description: Laudo deletado com sucesso
 *       404:
 *         description: Laudo não encontrado
 *       500:
 *         description: Erro ao deletar laudo
 */
router.delete('/:id', authenticate, authorize(['admin']), laudoController.deletelaudoById)

/**
 * @swagger
 * /api/laudos:
 *   delete:
 *     summary: Deleta todos os laudos
 *     tags: [Laudos]
 *     responses:
 *       200:
 *         description: Todos os laudos foram deletados com sucesso
 *       500:
 *         description: Erro ao deletar todos os laudos
 */
router.delete('/', authenticate, authorize(['admin']), laudoController.deletelaudo)

module.exports = router
