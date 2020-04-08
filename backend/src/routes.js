import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import RecipientSearchController from './app/controllers/RecipientSearchController';
import SessionController from './app/controllers/SessionController';
import DeliverymanSessionController from './app/controllers/DeliverymanSessionController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliverymanSearchController from './app/controllers/DeliverymanSearchController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryInfoController from './app/controllers/DeliveryInfoController';
import DeliveryStartController from './app/controllers/DeliveryStartController';
import DeliveryEndController from './app/controllers/DeliveryEndController';
import SignatureController from './app/controllers/SignatureController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
import ProblemsController from './app/controllers/ProblemsController';
import ProblemsSearchController from './app/controllers/ProblemsSearchController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Users
routes.post('/users', UserController.store);

// Session
routes.post('/session', SessionController.store);
routes.post('/deliveryman/session', DeliverymanSessionController.store);

// Start Delivery
routes.get('/delivery/:deliveryman_id', DeliveryStartController.index);
routes.put('/delivery/:id/start', DeliveryStartController.update);

// End Delivery
routes.get(
  '/deliveryman/:deliveryman_id/deliveries',
  DeliveryEndController.index
);
routes.put('/delivery/:id/end', DeliveryEndController.update);

// Signature
routes.post('/signature', upload.single('file'), SignatureController.store);

// Delivery Problems
routes.get('/delivery/:id/problems', DeliveryProblemsController.index);
routes.post('/delivery/:id/problems', DeliveryProblemsController.store);

// Authentication
routes.use(authMiddleware);

// Files
routes.post('/files', upload.single('file'), FileController.store);

// DeliverymanSearch
routes.get('/deliveryman', DeliverymanSearchController.index);

// Deliveryman
routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman/:deliveryman_id', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// DeliveryInfo
routes.get('/delivery/info/:delivery_id', DeliveryInfoController.index);

// Delivery
routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

// Problems Search
routes.get('/problem', ProblemsSearchController.index);

// Problems
routes.get('/problem/deliveries', ProblemsController.index);
routes.delete('/problem/:id/cancel-delivery', ProblemsController.delete);

// Recipient Search
routes.get('/recipient', RecipientSearchController.index);

// Recipient
routes.post('/recipient', RecipientController.store);
routes.get('/recipient/:recipient_id', RecipientController.index);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.delete);

// Users
routes.put('/users', UserController.update);

export default routes;
