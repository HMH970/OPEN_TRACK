const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const bcrypt = require("bcryptjs")


const db = require('../../db/models')
;
const { asyncHandler, csrfProptection, handleValidationErrors, check, validationResult} = require('../../utils')
const { route } = require('.');
// import { requireAuth } from '../../utils/auth';
const app = require('../../app')
// const {requireAuth} = require('../../utils')


// route to get all the tracks
router.get('/', csrfProtection, asyncHandler(async(req, res) => {
const tracks = await db.Track.findAll()
const images = await db.Image.findAll()
console.log("tracks route hit")
return res.json(tracks, images)
}))

module.exports = router;
