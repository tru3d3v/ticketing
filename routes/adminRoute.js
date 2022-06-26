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


router.post('/admin/resetUserPassword', async function(req, res, next) {
    try {
      const token =  req.header('token');
      const data = req.body;
      console.log('header token:'+token);
      res.json(await mnguserService.resetPassword(token,data.iduser,data.new_password));
  
    } catch (err) {
      console.error(`Error while getting data `, err.message);
      next(err);
    }
  });



router.post('/admin/updateUser', async function(req, res, next) {
    try {
      const token =  req.header('token');
      const data = req.body;
      console.log('header token:'+token);
      res.json(await mnguserService.updateUser(token,data.iduser,data.idrole, data.fullname,data.activation));
  
    } catch (err) {
      console.error(`Error while getting data `, err.message);
      next(err);
    }
  });

module.exports = router;