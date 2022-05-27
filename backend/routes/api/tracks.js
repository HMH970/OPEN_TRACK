const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const bcrypt = require("bcryptjs")


const db = require('../../db/models')
const {User, Track, Review, Image, Booking} = db;
const { asyncHandler, csrfProptection, handleValidationErrors, check, validationResult} = require('../../utils')
const { route } = require('.');
const app = require('../../app')
// const {requireAuth} = require('../../utils')


//route to get all the tracks
router.get('/api/tracks', csrfProtection, asyncHandler(async(req, res) => {
    if (req.session.auth === undefined) {
        res.redirect('../')
    }

const userId = req.session.auth.userId;

const tracks = await db.Track.findAll()
const images = await db.Image.findAll()
}))

module.exports = router;
