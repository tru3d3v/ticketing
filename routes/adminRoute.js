const express = require('express');
const router = express.Router();
const mnguserService = require('../services/manageUserService');

/* GET User. */
router.get('/listOfUsers', async function(req, res, next) {
  try {
    res.json(await mnguserService.getUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

module.exports = router;