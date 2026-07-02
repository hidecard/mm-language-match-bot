const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// User routes
router.get('/users', adminController.getUsers);
router.put('/users/:telegram_id', adminController.updateUser);
router.delete('/users/:telegram_id', adminController.deleteUser);

// Vocabulary routes
router.get('/vocabularies', adminController.getVocabularies);
router.post('/vocabularies', adminController.addVocabulary);
router.put('/vocabularies/:id', adminController.updateVocabulary);
router.delete('/vocabularies/:id', adminController.deleteVocabulary);

// Phrase routes
router.get('/phrases', adminController.getPhrases);
router.post('/phrases', adminController.addPhrase);
router.put('/phrases/:id', adminController.updatePhrase);
router.delete('/phrases/:id', adminController.deletePhrase);

// Session & Queue routes
router.get('/sessions', adminController.getSessions);
router.get('/queue', adminController.getMatchQueue);

module.exports = router;
