const express = require("express")
const asyncHandler = require("express-async-handler")
const {check} = require("express-validator")
const {handleValidationErrors} = require("../../utils/validation")
const {User, Booking} = require("../../db/models")

const router = express.Router()

//booking validators
const validateBookingAddForm = [
    check("date")
        .exists({ checkFalsy: true})
        .withMessage("Must Select a Date"),
    check("startTime")
        .exists({ checkFalsy: true})
        .withMessage("Must Select a Start Time"),
    check("startTime")
        .exists({ checkFalsy: true})
        .withMessage("Must Select a Start Time"),
]
//create booking
router.post("/",  asyncHandler(async(req, res) => {
    const {userId1, userId2, trackId, date, startTime, endTime} = req.body;
    const newBooking = await Booking.build({
        userId1, userId2, trackId, date, startTime, endTime
    });
    await newBooking.save()
    return res.json({newBooking})
}))
//edit booking
router.put("/:bookingId",  asyncHandler(async(req, res) => {
    const {bookingId} = req.params;
    const {userId1, userId2, trackId, date, startTime, endTime} = req.body;
    const updateBooking = await Booking.findByPk(bookingId)
    if(userId2 === updateBooking.userId2 && trackId === updateBooking.trackId) {
        await updateBooking.update({
            userId1, userId2, trackId, date, startTime, endTime
        })
        await updateBooking.save();
        return res.json({updateBooking})
    } else {
        return res.json("Could not update booking")
    }
}))
//delete review
router.delete("/:bookingId", asyncHandler(async(req, res) => {
    const {bookingId} = req.params;
    const deleteBooking = await Booking.findByPk(bookingId)
    if(deleteBooking) {
        await deleteBooking.destroy();
        return res.json({ message: "Booking Has Been Canceled"})
    } else {
        return res.json({message: "Booking can not be found."})
    }
}))

module.exports = router;
