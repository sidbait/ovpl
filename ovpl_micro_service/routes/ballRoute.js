const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { API_STATUS_MASTER } = require('../constants/STATUS')

const { sendResponse } = require('../helpers/sendResponseHelper')
const ballModel = require('../model/ballModel')
const ballService = require('../services/ballService')

router.use(bodyParser.json({ limit: "5mb" }));
router.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

router.post('/add', async (req, res) => {

    try {

        const ballDetails = new ballModel.Ball(req.body);
        const { error } = ballModel.validateBall(ballDetails);

        if (error) {
            if (error.details)
                sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.details[0].message);
            else sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.message);
            return;
        }

        const isOverExists = await ballService.checkOverExists(ballDetails.over_id);

        if (!isOverExists) {
            sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, 'over_id is not exists!');
            return;
        }

        const isOverCompleted = await ballService.checkOverCompleted(ballDetails.over_id);

        if (isOverCompleted >= 6) {
            sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, 'This over is already completed!');
            return;
        }

        const matchDetails = await ballService.getMatchDetailsByOver(ballDetails.over_id);
        const isBatsmanValid = await ballService.checkValidBatsman(ballDetails, matchDetails);

        if (!isBatsmanValid) {
            sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, 'Invalid Batsman!');
            return;
        }

        const isBowlerValid = await ballService.checkValidBowler(ballDetails);

        if (!isBowlerValid) {
            sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, 'Invalid Bowler!');
            return;
        }

        const result = await ballService.addBall(ballDetails);
        const data = {
            ball_id: result
        }

        sendResponse(res, API_STATUS_MASTER.CREATED, true, data, 'Ball added successfully!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})



router.post('/update', async (req, res) => {

    try {

        const teamDetails = new teamModel.UpdateTeam(req.body);
        const { error } = teamModel.validateUpdateTeam(teamDetails);

        if (error) {
            if (error.details)
                sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.details[0].message);
            else sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.message);
            return;
        }

        const result = await ballService.updateTeam(teamDetails);
        const data = {
            team_id: teamDetails.team_id
        }

        sendResponse(res, API_STATUS_MASTER.OK, true, data, 'Team updated successfully!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})


router.post('/get', async (req, res) => {

    try {

        const filterData = req.body;
        const result = await ballService.getAllTeams(filterData);
        const data = result;
        sendResponse(res, API_STATUS_MASTER.OK, true, data, 'Data Found!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})

module.exports = router;