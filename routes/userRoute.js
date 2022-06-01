const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

/* GET User. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await userService.getUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

module.exports = router;