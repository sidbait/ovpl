const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { API_STATUS_MASTER } = require('../constants/STATUS')

const { sendResponse } = require('../helpers/sendResponseHelper')
const teamModel = require('../model/teamModel')
const teamService = require('../services/teamService')

router.use(bodyParser.json({ limit: "5mb" }));
router.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

router.get('/team', async (req, res) => {
    console.log("asdasdas");
    res.send("Hello")
})

router.post('/add', async (req, res) => {

    try {

        const teamDetails = new teamModel.Team(req.body);
        const { error } = teamModel.validateTeam(teamDetails);

        if (error) {
            if (error.details)
                return sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.details[0].message);
            else return sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.message);
        }

        const addTeamResult = await teamService.addTeam(teamDetails);
        const data = {
            team_id: addTeamResult
        }

        sendResponse(res, API_STATUS_MASTER.CREATED, true, data, 'Team added successfully!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})

module.exports = router;