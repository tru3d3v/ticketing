const express = require('express');
const router = express.Router();
const mnguserService = require('../services/manageUserService');


router.get('/admin/listOfUsers', async function(req, res, next) {
  try {
    const token =  req.header('token');
    console.log('header token:'+token);
    res.json(await mnguserService.getUsers(req.query.page,token));

  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});


router.get('/admin/resetUserPassword', async function(req, res, next) {
    try {
      const token =  req.header('token');
      console.log('header token:'+token);
      res.json(await mnguserService.getUsers(req.query.page));
  
    } catch (err) {
      console.error(`Error while getting data `, err.message);
      next(err);
    }
  });

module.exports = router;