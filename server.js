import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import indexController from './APIs/controllers/bidController.js';
import authController from './APIs/controllers/AuthController.js';
import infoController from './APIs/controllers/InfoController.js';
import adminController from './APIs/controllers/AdminController.js';

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'build')));
// const apiRoutes =require('./api-routes');


// const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json())

app.use('/api/',adminController);
  
app.use('/api/',indexController);
app.use('/api/',authController);
app.use('/api/',infoController);
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);