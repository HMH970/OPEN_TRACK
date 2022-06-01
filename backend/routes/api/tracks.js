const express = require('express');
// const req = require('express/lib/request');
const asyncHandler = require("express-async-handler");
const router = express.Router();
// const { Track } = require("../../db/models");


const db = require('../../db/models')
// ;
// const { asyncHandler, csrfProptection, handleValidationErrors, check, validationResult} = require('../../utils')
// const { route } = require('.');
// // import { requireAuth } from '../../utils/auth';
// const app = require('../../app')
// // const {requireAuth} = require('../../utils')



// route to get all the tracks
router.get('/',  asyncHandler(async(req, res) => {
  console.log("tracks route hit")
const tracks = await db.Track.findAll()
const images = await db.Image.findAll()
return res.json(images)

}))

module.exports = router;
