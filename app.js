const express = require('express');
const config = require('config');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');


const bodyParser = require('body-parser');
const news = require('./routes/admin/news.routes');
const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));
app.use('/api/v1/auth', require('./routes/auth/register.routes'));
app.use('/api/v1/auth', require('./routes/auth/login.routes'));
app.use('/api/v1/admin', require('./routes/admin/tournaments.routes'));
app.use('/api/v1/admin', require('./routes/admin/referee.routes'));
app.use('/api/v1/admin', require('./routes/admin/player.routes'));
app.use('/api/v1/admin', require('./routes/admin/manager.routes'));
app.use('/api/v1/admin', news);
app.use('/api/v1/admin', require('./routes/admin/team.routes'));
app.use('/api/v1/admin', require('./routes/admin/game.routes'));
app.use('/api/v1/admin', require('./routes/admin/event.routes'));
app.use('/api/v1/admin', require('./routes/admin/currentTournament.routes'));
app.use('/api/v1/admin', require('./routes/admin/uploadFile.routes'));
app.use('/api/v1/', require('./routes/settings.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'ligagoroda', 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'ligagoroda', 'dist', 'ligagoroda', 'index.html' ))
    })
}

const PORT = config.get('port') || 5000;
const mongoUri = config.get('mongoUri');


async function start() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        });
        app.listen(PORT, () => console.log(`--> App has been STARTED on port ${PORT}...`));
    } catch (e) {
        console.log('Server error: ', 'Ошибка сервера');
        process.exit(1);
    }
}

start();

