const express = require('express');
const router = express.Router();
const userService = require('../services/userService');




router.post('/register', async function(req, res, next) {
  try {
    //console.log(req.body);
    const data = req.body;
    res.json(await userService.entryUser(data.fullname,data.email,data.password));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

router.post('/login', async function(req, res, next) {
  try {
  //  console.log(req.body);
    const data = req.body;
    res.json(await userService.login(data.email,data.password));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

router.post('/logout', async function(req, res, next) {
  try {
   // console.log(req.body);
    const data = req.body;
    res.json(await userService.logout(data.token));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

router.post('/checkToken', async function(req, res, next) {
  try {
   // console.log(req.body);
    const data = req.body;
    res.json(await userService.checkToken(data.token));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

router.post('/viewProfile', async function(req, res, next) {
  try {
   // console.log(req.body);
    const data = req.body;
    res.json(await userService.viewProfile(data.token));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

router.post('/updateProfile', async function(req, res, next) {
  try {
   // console.log(req.body);
    const data = req.body;
    res.json(await userService.updateProfileUserByUser(data.token,data.fullname,data.old_email,data.new_email,data.current_pwd,data.new_pwd));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

module.exports = router;