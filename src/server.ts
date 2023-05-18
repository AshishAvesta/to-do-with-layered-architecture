// src/server.ts

import express from 'express';
import cors from 'cors';
import toDoRoutes from './presentation/routes/toDoRoutes';
//const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api/', toDoRoutes);
app.use(toDoRoutes);

// parse body params and attache them to req.body
//app.use(bodyParser.json({ limit: '50mb' }));
//app.use(bodyParser.urlencoded({ extended: true }));

app.listen(4567, () => {
  console.log('Server is running on port 4567');
});
