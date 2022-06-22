const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

/* GET User. */
router.get('/users', async function(req, res, next) {
  try {
    res.json(await userService.getUsers(req.query.page));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});


router.post('/register', async function(req, res, next) {
  try {
    console.log(req.body);
    const data = req.body;
    res.json(await userService.entryUser(data.fullname,data.email,data.password));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

router.post('/login', async function(req, res, next) {
  try {
    console.log(req.body);
    const data = req.body;
    res.json(await userService.login(data.email,data.password));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

module.exports = router;