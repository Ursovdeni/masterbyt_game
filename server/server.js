const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const apiRouter = require('./routes/api.router');

require('dotenv').config();

const corsOptions = {
  origin: ['http://localhost:5173'],
  optionsSuccessStatus: 200,
  credentials: true,
};

const sessionConfig = {
  name: 'mySession',
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  },
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(expressSession(sessionConfig));
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.get('/*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
