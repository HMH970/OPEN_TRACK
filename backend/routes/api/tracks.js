const express = require('express');
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { check } = require("express-validator")
const {handleValidationErrors } = require("../../utils/validation")

const {User, Track, Image, Review} = require('../../db/models')



// route to get all the tracks
router.get('/',  asyncHandler(async(req, res) => {

const tracks = await Track.findAll({
    include: [User, Image]
})

return res.json(tracks)
}))
// route to get track by id (api/tracks/:trackId)
router.get('/:trackId', asyncHandler(async(req, res) => {
    const {trackId} = req.params
    const track = await Track.findByPk(trackId, {
        include: [Image, User, Review]
    })

    return res.json(track)
}))
// create track validators
const validateTrackAddForm = [
    check("name")
        .exists({ checkFalsy: true})
        .withMessage("Please Provide a Track Name.")
        .isLength({ max: 75})
        .withMessage("Name can not be longer than 75 characters."),
    check("address")
        .exists({ checkFalsy: true})
        .withMessage("Please provide an address for track")
        .isLength({ max: 255})
        .withMessage("Address exceeds 255 characters"),
    check("city")
        .exists({ checkFalsy: true})
        .withMessage("Must Provide a city.")
        .isLength({ max: 100 })
        .withMessage("City name exceeds 100 characters"),
    check("state")
        .exists({ checkFalsy: true})
        .withMessage("Must Provide a state.")
        .isLength({ max: 50 })
        .withMessage("State name exceeds 50 characters"),
    check("country")
        .exists({ checkFalsy: true})
        .withMessage("Must Provide a country.")
        .isLength({ max: 50 })
        .withMessage("Country name exceeds 50 characters"),
    check("phone")
        .isLength({ max: 14 })
        .withMessage("Phone number exceeds 14 characters use Format (111) 111-1111"),
    check("web")
        .isLength({ max: 50 })
        .withMessage("Url can not exceed 50 characters"),
    handleValidationErrors,
]
// create new track MAY NEED REQUIRE AUTH
router.post("/", validateTrackAddForm, asyncHandler(async(req, res) => {
    const {userId, name, address, city, state, country, phone, web, price} = req.body;
    const newTrack = await Track.build({
        userId, name, address, city, state, country, phone, web, price
    })
    await newTrack.save();
    res.redirect(`/${newTrack.id}`)
    return res.json(newTrack)

}))
//get track by id
router.get(`/:trackId(\\d+)`, asyncHandler(async(req,res) => {
    const {trackId} = req.params;
    const track = await Track.findByPk(trackId, {
        include: [User, Image]
    })
    return res.json(track)
}))
// edit track
router.put("/:trackId"), validateTrackAddForm, asyncHandler(async(req, res) => {
    const {trackId} = req.params;
    const {userId, name, address, city, state, country, phone, web, price} = req.body;
    const trackToUpdate = await Track.findByPk(trackId, {
        include: [User, Image]
    });

    if(trackToUpdate) {
    await trackToUpdate.update({userId, name, address, city, state, country, phone, web, price})
    await trackToUpdate.save()
    return res.json(trackToUpdate)
    } else {
        return res.json("Track not found")
    }
})
// delet track
router.delete("/:trackid", asyncHandler(async(req, res) => {
    const {trackId} = req.params;
    const trackToDelete = await Track.findByPk(trackId);

    if(trackToDelete) {
        await trackToDelete.destroy();
        return res.json({ message: "Track Delete Successful"})
    }
}))

router.get("/:trackid/reviews", asyncHandler(async(req, res) => {
    const {trackId} = req.params;
    const reviews = await Review.findAll({
        where: {
            trackId
        },
        include: [{model: User}]
    });
    return res.json(reviews)
}))
module.exports = router;
