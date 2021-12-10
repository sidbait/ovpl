const Joi = require("joi");
const { DB_STATUS_MASTER } = require('../constants/STATUS')

const Match = function (matchDetails) {
    this.tournament_id = matchDetails.tournament_id;
    this.team_1 = matchDetails.team_1;
    this.team_2 = matchDetails.team_2;
    this.toss_won = matchDetails.toss_won;
    this.toss_decision = matchDetails.toss_decision;
    this.wickets_per_inn = matchDetails.wickets_per_inn;
    this.overs_per_inn = matchDetails.overs_per_inn;
    this.max_overs_bowler = matchDetails.max_overs_bowler;
    this.mom = matchDetails.mom;
    this.label = matchDetails.label;
    this.status = matchDetails.status ? matchDetails.status : DB_STATUS_MASTER.ACTIVE;
};

const validateMatch = (matchDetails) => {

    const matchSchema = Joi.object({
        tournament_id: Joi.number().required(),
        team_1: Joi.number().required(),
        team_2: Joi.number().required(),
        toss_won: Joi.number().allow("", null),
        toss_decision: Joi.string().trim().allow("", null),
        wickets_per_inn: Joi.number().required(),
        overs_per_inn: Joi.number().required(),
        max_overs_bowler: Joi.number().allow("", null),
        mom: Joi.number().allow("", null),
        label: Joi.string().trim().allow("", null),
        status: Joi.number().allow("", null)
    });

    console.log(matchDetails);

    return matchSchema.validate(matchDetails);
};


const UpdateMatch = function (matchDetails) {
    this.match_id = matchDetails.match_id ? parseInt(matchDetails.match_id) : null;
    this.tournament_id = matchDetails.tournament_id;
    this.team_1 = matchDetails.team_1;
    this.team_2 = matchDetails.team_2;
    this.toss_won = matchDetails.toss_won;
    this.toss_decision = matchDetails.toss_decision;
    this.wickets_per_inn = matchDetails.wickets_per_inn;
    this.overs_per_inn = matchDetails.overs_per_inn;
    this.max_overs_bowler = matchDetails.max_overs_bowler;
    this.mom = matchDetails.mom;
    this.label = matchDetails.label;
    this.status = matchDetails.status ? matchDetails.status : DB_STATUS_MASTER.ACTIVE;
};

const validateUpdateMatch = (matchDetails) => {

    const matchSchema = Joi.object({
        match_id: Joi.number().required(),
        tournament_id: Joi.number().required(),
        team_1: Joi.number().required(),
        team_2: Joi.number().required(),
        toss_won: Joi.number().allow("", null),
        toss_decision: Joi.string().trim().allow("", null),
        wickets_per_inn: Joi.number().required(),
        overs_per_inn: Joi.number().required(),
        max_overs_bowler: Joi.number().allow("", null),
        mom: Joi.number().allow("", null),
        label: Joi.string().trim().allow("", null),
        status: Joi.number().allow("", null)
    });

    return matchSchema.validate(matchDetails);
};


module.exports = {
    Match,
    validateMatch,
    UpdateMatch,
    validateUpdateMatch
}