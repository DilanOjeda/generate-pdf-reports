const {Router} = require('express');
const router = Router();

const {generatePDF} = require('../controllers')

router.get('/generate-pdf', generatePDF);

module.exports = router;