import bodyParser from 'body-parser';
import compression from 'compression';  // compresses requests
import cors = require('cors');
import dotenv from 'dotenv';
import express from 'express';
import expressValidator from 'express-validator';

import lusca from 'lusca';
import path from 'path';

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env.example' });

// Controllers (route handlers)
import * as apiController from './controllers/api';
import * as itemController from './controllers/item';

import ItemLocalStorage from './persistence/itemLocalStorage';
import ItemService from './persistence/itemService';
// Create Express server
const app = express();

app.use(cors());

// Express configuration
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
app.get('/api', apiController.index);

app.get('/api/list/:listId/items', itemController.getItems);
app.post('/api/list/:listId/items', itemController.postItem);
app.patch('/api/list/:listId/items', itemController.reOrderItems);
app.delete('/api/list/:listId/items', itemController.deleteItems);

app.get('/api/list/:listId/items/:itemId', itemController.getItem);
app.put('/api/list/:listId/items/:itemId', itemController.putItem);
app.delete('/api/list/:listId/items/:itemId', itemController.deleteItem);

// Initialize localStorage service
export const ItemService: ItemService = new ItemLocalStorage();

export default app;
