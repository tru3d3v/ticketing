const express = require('express');
const router = express.Router();
const studioService = require('../services/studioService');




router.post('/publicListMovie', async function(req, res, next) {
  try {
    //console.log(req.body);
    const data = req.body;
    const token =  req.header('token');
    const idrole = data.idrole==undefined ? 0 : data.idrole;
    res.json(await studioService.publicListMovie(token, data.idmovie, data.studio_label,  data.start_date, data.end_date,data.comming_soon,data.limit));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

module.exports = router;