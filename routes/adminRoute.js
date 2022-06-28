const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const mnguserService = require('../services/manageUserService');
const movieService = require('../services/movieService');
const studioService = require('../services/studioService');


router.get('/admin/listOfUsers', async function (req, res, next) {
  try {
    const token = req.header('token');
    console.log('header token:' + token);
    res.json(await mnguserService.getUsers(req.query.page, token));

  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});


router.post('/admin/resetUserPassword', async function (req, res, next) {
  try {
    const token = req.header('token');
    const data = req.body;
    console.log('header token:' + token);
    res.json(await mnguserService.resetPassword(token, data.iduser, data.new_password));

  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});



router.post('/admin/updateUser', async function (req, res, next) {
  try {
    const token = req.header('token');
    const data = req.body;
    console.log('header token:' + token);
    res.json(await mnguserService.updateUser(token, data.iduser, data.idrole, data.fullname, data.activation));

  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

router.post('/admin/entryMovie', upload.array('photos', 12), async function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  const token = req.header('token');
  const data = req.body;
  var thumbnailPicture = "";
  var largePicture = "";
  if (req.files != undefined) {
    for (var i = 0; i < req.files.length; i++) {
      const item = req.files[i];
      const ext = path.extname(item.originalname);
      if (i == 0) {
        thumbnailPicture = item.filename+ext;
      } else if (i == 1) {
        largePicture = item.filename+ext;
      }
      if (i > 1) {
        break;
      }
    }

  }

 // res.json(req.files);
  res.json(await movieService.entryMovie(token, data.judul, data.description, thumbnailPicture, largePicture, data.start_date, data.end_date));


});

router.post('/admin/updateMovie', upload.array('photos', 12), async function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  const token = req.header('token');
  const data = req.body;
  var thumbnailPicture = "";
  var largePicture = "";
  if (req.files != undefined) {
    for (var i = 0; i < req.files.length; i++) {
      const item = req.files[i];
      const ext = path.extname(item.originalname);
      if (i == 0) {
        thumbnailPicture = item.filename+ext;
      } else if (i == 1) {
        largePicture = item.filename+ext;
      }
      if (i > 1) {
        break;
      }
    }

  }

 // res.json(req.files);
  res.json(await movieService.updateMovie(token,data.idmovie, data.judul, data.description, thumbnailPicture, largePicture, data.start_date, data.end_date));


});

router.get('/images/:filename', function (req, res) {
  const file = (`${__dirname}/uploads/` + req.params.filename).replace('routes/', '');
  //res.download(file); // Set disposition and send it.
  res.setHeader("content-type", "image/jpeg");
  //res.setHeader('content-type','application/pdf');
  fs.createReadStream(file).pipe(res);
});

router.post('/admin/listMovie', async function (req, res, next) {
  try {
    const token = req.header('token');
    const data = req.body;
    console.log('header token:' + token);
    res.json(await movieService.listMovie(token, data.judul, data.start_date, data.end_date));

  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});
router.post('/admin/entryStudio', async function (req, res, next) {
  try {
    const token = req.header('token');
    const data = req.body;
    console.log('header token:' + token);
    res.json(await studioService.entryStudio(token, data.idmovie, data.studio_label, data.jumlah_sheet, data.price, data.start_date, data.end_date,data.comming_soon));

  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});
router.post('/admin/updateStudio', async function (req, res, next) {
  try {
    const token = req.header('token');
    const data = req.body;
    console.log('header token:' + token);
    res.json(await studioService.updateStudio(token,data.studio_id, data.idmovie, data.studio_label, data.jumlah_sheet, data.price, data.start_date, data.end_date,data.comming_soon));

  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});
router.post('/admin/listOfStudio', async function (req, res, next) {
  try {
    const token = req.header('token');
    const data = req.body;
    console.log('header token:' + token);
    res.json(await studioService.listOfStudio(token, data.idmovie, data.studio_label,  data.start_date, data.end_date,data.comming_soon));

  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});
module.exports = router;