const express = require('express')
const router = express.Router();
//End points
router.use('/auth', require('./authentication'))
router.use('/todos', require('./todos'))

module.exports = router