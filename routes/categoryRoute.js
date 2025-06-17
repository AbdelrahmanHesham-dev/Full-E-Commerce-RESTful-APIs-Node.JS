const express = require('express');

const { getCategories } = require('../services/categoryServices');

const router = express.Router();

router.get('/', getCategories);

module.exports = router;