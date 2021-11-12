const Joi = require("joi");
const { DB_STATUS_MASTER } = require('../constants/STATUS')

const Team = function (teamDetails) {
    this.team_name = teamDetails.team_name;
    this.team_owner = teamDetails.team_owner;
    this.team_motto = teamDetails.team_motto;
    this.status = teamDetails.status ? teamDetails.status : DB_STATUS_MASTER.ACTIVE;
};

const validateTeam = (teamDetails) => {

    const teamSchema = Joi.object({
        team_name: Joi.string().strict().required().trim(),
        team_owner: Joi.string().strict().required().trim(),
        team_motto: Joi.string().trim().allow("", null),
        status: Joi.number().allow("", null)
    });

    console.log(teamDetails);

    return teamSchema.validate(teamDetails);
};


module.exports = {
    Team,
    validateTeam
}