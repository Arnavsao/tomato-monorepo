import express from 'express';
import { 
  submitContact, 
  getAllContacts, 
  getContactById, 
  updateContactStatus, 
  deleteContact 
} from '../controllers/contactController.js';

const router = express.Router();

// Public routes
router.post('/contact', submitContact);

// Admin routes (you can add auth middleware here later)
router.get('/contacts', getAllContacts);
router.get('/contacts/:id', getContactById);
router.put('/contacts/:id/status', updateContactStatus);
router.delete('/contacts/:id', deleteContact);

export default router; 