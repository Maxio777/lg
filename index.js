const {app, path, express, mongoose, config} = require('./app');

const PORT = config.get('port') || 5000;
const MONGO_URI = config.get('mongoUri');
const STATIC_FOLDER = path.join(__dirname, 'ligagoroda', 'dist', 'ligagoroda');
const INDEX_HTML = path.resolve(__dirname, 'ligagoroda', 'dist', 'ligagoroda', 'index.html');


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(STATIC_FOLDER));

    app.get('*', (req, res) => {
        res.sendFile(INDEX_HTML)
    })
}

async function start() {
    try {
        await mongoose.connect(MONGO_URI, {
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

