const express = require('express')
const router = express.Router();
const {songSearch,songSuggestions,songGerenator} = require('../controller/song')


router.get('/search/:name?',songSearch)
router.get('/suggestion/:name',songSuggestions)
router.get('/download/:id?',songGerenator)

module.exports = router