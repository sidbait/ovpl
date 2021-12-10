const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { API_STATUS_MASTER } = require('../constants/STATUS')

const { sendResponse } = require('../helpers/sendResponseHelper')

const playerModel = require('../model/playerModel')
const playerService = require('../services/playerService')

router.use(bodyParser.json({ limit: "5mb" }));
router.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));



router.get('/player', async (req, res) => {
    console.log("player");
    res.send("Hello")
})




router.post('/add', async (req, res) => {

    try {

        const playerDetails = new playerModel.Player(req.body);
        const { error } = playerModel.validatePlayer(playerDetails);

        if (error) {
            if (error.details)
                sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.details[0].message);
            else sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.message);
            return;
        }

        const addPlayerResult = await playerService.addPlayer(playerDetails);
        const data = {
            player_id: addPlayerResult
        }

        sendResponse(res, API_STATUS_MASTER.CREATED, true, data, 'Player added successfully!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})




router.post('/update', async (req, res) => {

    try {

        const playerDetails = new playerModel.UpdatePlayer(req.body);
        const { error } = playerModel.validateUpdatePlayer(playerDetails);

        if (error) {
            if (error.details)
                sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.details[0].message);
            else sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.message);
            return;
        }

        const result = await teamService.UpdatePlayer(playerDetails);
        const data = {
            player_id : playerDetails.player_id
        }

        sendResponse(res, API_STATUS_MASTER.OK, true, data, 'Player updated successfully!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})





router.post('/get', async (req, res) => {

    try {

        const filterData = req.body;
        const result = await playerService.getAllPlayers(filterData);
        const data = result;
        sendResponse(res, API_STATUS_MASTER.OK, true, data, 'Data Found!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})

module.exports = router;