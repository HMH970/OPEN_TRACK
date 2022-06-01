const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const {check} = require("express-validator")
const {handleValidationErrors} = require("../../utils/validation")
const {setTokenCookie, requireAuth} = require("../../utils/validation")
const {User, Track, Image, Booking, Review} = require("../../db/models")

//get alll reviews by track id
router.get("/tracks/:id", asyncHandler(async(req, res) => {
    const {trackId} = req.params;
    const reviews = await Review.findAll({
        where: {
            trackId
        },
        include: [{model: User}]
    });
    return res.json({reviews})
}))
//review validators
const validateReviewAddForm = [
    check("review")
        .exists({ checkFalsy: true})
        .withMessage("Review can not be empty")
        .isLength({ max: 255 })
        .withMessage("Review can not be longer than 255 characters."),
        handleValidationErrors,
]
//create review
router.post("/", requireAuth, asyncHandler(async(req, res) => {
    const {userId, trackId, review} = req.body;
    const newReview = await Review.build({
        userId, trackId, review,
    });
    await newReview.save()
    return res.json({newReview})
}))
//edit review
router.put("/:reviewId", requireAuth, asyncHandler(async(req, res) => {
    const {reviewId} = req.params;
    const {userId, trackId, review} = req.body;
    const updateReview = await Review.findByPk(reviewId)
    if(userId === updateReview.userId && trackId === updateReview.trackId) {
        await updateReview.update({review})
        await updateReview.save();
        return res.json({updateReview})
    } else {
        return res.json("Error with edit")
    }
}))
//delete review
router.delete("/:reviewId", asyncHandler(async(req, res) => {
    const {reviewId} = req.params;
    const deleteReview = await Review.findByPk(reviewId)
    if(deleteReview) {
        await deleteReview.destroy();
        return res.json({ message: "Review Deleted Successfully"})
    } else {
        return res.json({message: "Review can not be found."})
    }
}))
