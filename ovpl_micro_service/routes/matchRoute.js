const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { API_STATUS_MASTER } = require('../constants/STATUS')

const { sendResponse } = require('../helpers/sendResponseHelper')
const matchModel = require('../model/matchModel')
const matchService = require('../services/matchService')

router.use(bodyParser.json({ limit: "5mb" }));
router.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

router.post('/add', async (req, res) => {

    try {

        const matchDetails = new matchModel.Match(req.body);
        const { error } = matchModel.validateMatch(matchDetails);

        if (error) {
            if (error.details)
                sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.details[0].message);
            else sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.message);
            return;
        }

        const result = await matchService.addMatch(matchDetails);
        const data = {
            match_id: result
        }

        sendResponse(res, API_STATUS_MASTER.CREATED, true, data, 'Match added successfully!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})



router.post('/update', async (req, res) => {

    try {

        const matchDetails = new matchModel.UpdateMatch(req.body);
        const { error } = matchModel.validateUpdateMatch(matchDetails);

        if (error) {
            if (error.details)
                sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.details[0].message);
            else sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.message);
            return;
        }

        const result = await matchService.updateMatch(matchDetails);
        const data = {
            match_id : matchDetails.match_id
        }

        sendResponse(res, API_STATUS_MASTER.OK, true, data, 'match updated successfully!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})


router.post('/get', async (req, res) => {

    try {

        const filterData = req.body;
        const result = await matchService.getAllMatches(filterData);
        const data = result;
        sendResponse(res, API_STATUS_MASTER.OK, true, data, 'Data Found!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})

module.exports = router;