const  express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authent');
const analytics = require('./routes/analytics');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const category = require('./routes/category');
const position = require('./routes/position');
const product = require('./routes/product');
const passport = require('passport');
const  app = express();
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI)
    .then(() => console.log('Mongo connected'))
    .catch(error => console.log(error))

app.use(passport.initialize());
require('./middleware/passport')(passport)
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analytics);
app.use('/api/category', category);
app.use('/api/position', position);
app.use('/api/product', product);

module.exports = app;