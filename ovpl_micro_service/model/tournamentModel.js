const Joi = require("joi");
const { DB_STATUS_MASTER } = require('../constants/STATUS')

const Tournament = function (tournamentDetails) {
    this.tournament_name = tournamentDetails.tournament_name;
    this.label = tournamentDetails.label;
    this.duration = tournamentDetails.duration;
};



const validateTournament = (tournamentDetails) => {

    const tournamentSchema = Joi.object({
        tournament_name: Joi.string().strict().required().trim(),
        label: Joi.string().strict().required().trim(),
        duration: Joi.string().trim().allow("", null),
    });

    console.log(tournamentDetails);

    return tournamentSchema.validate(tournamentDetails);
};


const UpdateTournament = function (tournamentDetails) {
    this.tournament_id = tournamentDetails.tournament_id ? parseInt(tournamentDetails.tournament_id) : null;
    this.tournament_name = tournamentDetails.tournament_name;
    this.label = tournamentDetails.label;
    this.duration = tournamentDetails.duration;
};


const validateUpdateTournament = (tournamentDetails) => {

    const tournamentSchema = Joi.object({
        tournament_id: Joi.number().required(),
        tournament_name: Joi.string().strict().required().trim(),
        label: Joi.string().strict().required().trim(),
        duration: Joi.string().trim().allow("", null),
    });

    return tournamentSchema.validate(tournamentDetails);
};


module.exports = {
    Tournament,
    validateTournament,
    UpdateTournament,
    validateUpdateTournament
}