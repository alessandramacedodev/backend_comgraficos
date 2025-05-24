const mongoose = require('mongoose');

const laudo = new mongoose.Schema({
    // Título do laudo
    tituloLaudo: {
        type: String,
        required: true,
        trim: true
    },
    // Número do laudo
    numeroLaudo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    // Data de emissão
    dataEmissao: {
        type: Date,
        required: true
    },
    // Tipo do laudo
    tipoLaudo: {
        type: String,
        enum: ['preliminar', 'final', 'complementar'],
        required: true
    },
    // Estrutura do conteúdo do laudo
    conteudoLaudo: {
        introducao: {
            type: String,
            required: true
        },
        metodologia: {
            type: String,
            required: true
        },
        analiseEresultados: {
            type: String,
            required: true
        },
        conclusao: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Laudo', laudoSchema);