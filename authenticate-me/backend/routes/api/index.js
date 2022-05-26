const router = require('express').Router();
//all api routes will be in here




router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });






module.exports = router;
