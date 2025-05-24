require('dotenv').config();
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/db/conexao.js')
const usuarioRouter = require('./src/routes/user.route.js')
const casoRouter = require('./src/routes/case.route.js')
const evidenciaRouter = require('./src/routes/evidencia.route.js')
const laudoRouter = require('./src/routes/evidencia.route.js')
const bancoodonto = require('./src/routes/bancoodonto.route.js')

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/user', usuarioRouter)
app.use('/api/caso', casoRouter)
app.use('/api/evidencia', evidenciaRouter)
app.use('/api/laudo', laudoRouter)
app.use('/api/bancoodonto', bancoodontoRouter)

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server in running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(`Error starting the server on http://localhost:${PORT}`, error);
        process.exit(1);
    }
}

startServer();

