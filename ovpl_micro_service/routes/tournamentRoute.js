const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const { API_STATUS_MASTER } = require('../constants/STATUS')

const { sendResponse } = require('../helpers/sendResponseHelper')
const tournamentModel = require('../model/tournamentModel')
const tournamentService = require('../services/tournamentService')

router.use(bodyParser.json({ limit: "5mb" }));
router.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

router.get('/tournament', async (req, res) => {
    console.log("tournament");
    res.send("Hello")
})



router.post('/add', async (req, res) => {

    try {

        const tournamentDetails = new tournamentModel.Tournament(req.body);
        const { error } = tournamentModel.validateTournament(tournamentDetails);

        if (error) {
            if (error.details)
                sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.details[0].message);
            else sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.message);
            return;
        }

        const addTournamentResult = await tournamentService.addTournament(tournamentDetails);
        const data = {
            tournament_id: addTournamentResult
        }

        sendResponse(res, API_STATUS_MASTER.CREATED, true, data, 'Tournament added successfully!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})





router.post('/update', async (req, res) => {

    try {

        const tournamentDetails = new tournamentModel.UpdateTournament(req.body);
        const { error } = tournamentModel.validateUpdateTournament(tournamentDetails);

        if (error) {
            if (error.details)
                sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.details[0].message);
            else sendResponse(res, API_STATUS_MASTER.BAD_REQUEST, false, {}, error.message);
            return;
        }

        const result = await tournamentService.updateTournament(tournamentDetails);
        const data = {
            tournament_id : tournamentDetails.tournament_id
        }

        sendResponse(res, API_STATUS_MASTER.OK, true, data, 'tournament updated successfully!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})




router.post('/get', async (req, res) => {

    try {

        const filterData = req.body;
        const result = await tournamentService.getAllTournaments(filterData);
        const data = result;
        sendResponse(res, API_STATUS_MASTER.OK, true, data, 'Data Found!');
        return;

    } catch (error) {
        console.error("catch error", error);
        sendResponse(res, API_STATUS_MASTER.INTERNAL_SERVER_ERROR, false, {}, 'Something Went Wrong!');
    }

})



module.exports = router;