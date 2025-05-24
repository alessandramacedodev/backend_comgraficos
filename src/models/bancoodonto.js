const mongoose = require('mongoose');

const bancoodontoSchema = new mongoose.Schema({
    // Tipo do registro: ante-mortem ou post-mortem
    tipo: {
        type: String,
        enum: ['ante-mortem', 'post-mortem'],
        required: true
    },

    // Data do registro
    dataRegistro: {
        type: Date,
        required: true
    },

    // Característica geral do paciente
    caracteristica: {
        type: String,
        trim: true,
        required: true
    },

    // Status do registro
    status: {
        type: String,
        enum: ['ativo', 'inativo'],
        default: 'ativo'
    },

    // Tipo de dentição
    tipoDenticao: {
        type: String,
        enum: ['decídua', 'permanente', 'mista'],
        required: true
    },

    // Características específicas observadas
    caracteristicasEspecificas: {
        type: [String],
        enum: ['dentes ausentes', 'implante', 'ponte', 'coroa', 'restaurações'],
        default: []
    },

    // Região da arcada dentária
    regiao: {
        type: [String],
        enum: ['anterior', 'posterior', 'maxila', 'mandíbula'],
        default: []
    },

    // URL do arquivo relacionado ao registro
    fileUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const validExtensions = /\.(jpg|jpeg|png|gif|pdf|mp4|avi|mov|mkv|webm)$/i;
                const isHttpUrl = /^https?:\/\/.+/i.test(value);
                const hasValidExtension = validExtensions.test(value);
                const isRawUpload = value.includes('/raw/upload/');

                return isHttpUrl && (hasValidExtension || isRawUpload);
            },
            message: props => `${props.value} não é uma URL válida com extensão permitida (.jpg, .png, .gif, .pdf, .mp4, .mov, etc.)`
        }
    }

}, { timestamps: true });

const bancoodonto = mongoose.model('bancoodonto', bancoodontoSchema);
module.exports = bancoodonto;
