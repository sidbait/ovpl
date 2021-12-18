const Joi = require("joi");
const { DB_STATUS_MASTER } = require('../constants/STATUS')

const Player = function (playerDetails) {
    this.player_name = playerDetails.player_name;
    this.player_bat = playerDetails.player_bat;
    this.team_id = playerDetails.team_id;
    this.player_bowl = playerDetails.player_bowl;
    this.player_wicket = playerDetails.player_wicket;
    this.player_captain = playerDetails.player_captain;
    this.status = playerDetails.status ? playerDetails.status : DB_STATUS_MASTER.ACTIVE;
};



const validatePlayer = (playerDetails) => {

    const playerSchema = Joi.object({
        player_name: Joi.string().strict().required().trim(),
        player_bat: Joi.string().strict().required().trim(),
        team_id: Joi.number().allow("", null),
        player_bowl: Joi.string().strict().required().trim(),
        player_wicket: Joi.string().strict().required().trim(),
        player_captain: Joi.string().strict().required().trim(),
        status: Joi.number().allow("", null)
    });

    console.log(playerDetails);

    return playerSchema.validate(playerDetails);
};



const UpdatePlayer = function (playerDetails) {
    this.player_id = playerDetails.player_id ? parseInt(playerDetails.player_id) : null;
    this.player_name = playerDetails.player_name;
    this.team_id = playerDetails.team_id;
    this.player_bat = playerDetails.player_bat;
    this.player_bowl = playerDetails.player_bowl;
    this.player_wicket = playerDetails.player_wicket;
    this.player_captain = playerDetails.player_captain;
    this.status = playerDetails.status ? playerDetails.status : DB_STATUS_MASTER.ACTIVE;
};



const validateUpdatePlayer = (playerDetails) => {

    const playerSchema = Joi.object({
        player_id: Joi.number().required(),
        player_name: Joi.string().strict().required().trim(),
        team_id: Joi.number().allow("", null),
        player_bat: Joi.string().strict().required().trim(),
        player_bowl: Joi.string().strict().required().trim(),
        player_wicket: Joi.string().strict().required().trim(),
        player_captain: Joi.string().strict().required().trim(),
        status: Joi.number().allow("", null)
    });

    return playerSchema.validate(playerDetails);
};

module.exports = {
    Player,
    validatePlayer,
    UpdatePlayer,
    validateUpdatePlayer
}