const Joi = require("joi");
const { DB_STATUS_MASTER } = require('../constants/STATUS')

const Ball = function (ballDetails) {
    this.over_id = ballDetails.over_id ? parseInt(ballDetails.over_id) : null;
    this.batsman = ballDetails.batsman ? parseInt(ballDetails.batsman) : null;
    this.bowler = ballDetails.bowler ? parseInt(ballDetails.bowler) : null;
    this.runs = ballDetails.runs ? parseInt(ballDetails.runs) : 0;
    this.wicket = ballDetails.wicket ? parseInt(ballDetails.wicket) : 0;
    this.caught = ballDetails.caught ? parseInt(ballDetails.caught) : 0;
    this.runout = ballDetails.runout ? parseInt(ballDetails.runout) : 0;
    this.noball = ballDetails.noball ? parseInt(ballDetails.noball) : 0;
    this.wide = ballDetails.wide ? parseInt(ballDetails.wide) : 0;
    this.status = ballDetails.status ? ballDetails.status : DB_STATUS_MASTER.ACTIVE;
};

const validateBall = (ballDetails) => {

    const ballSchema = Joi.object({
        over_id: Joi.number().required(),
        batsman: Joi.number().required(),
        bowler: Joi.number().required(),
        runs: Joi.number().required(),
        wicket: Joi.number().allow("", null),
        caught: Joi.number().allow("", null),
        runout: Joi.number().allow("", null),
        noball: Joi.number().allow("", null),
        wide: Joi.number().allow("", null),
        status: Joi.number().allow("", null)
    });

    console.log(ballDetails);
    return ballSchema.validate(ballDetails);
};


const UpdateBall = function (ballDetails) {
    this.ball_id = ballDetails.ball_id ? parseInt(ballDetails.ball_id) : null;
    this.over_id = ballDetails.over_id ? parseInt(ballDetails.over_id) : null;
    this.batsman = ballDetails.batsman ? parseInt(ballDetails.batsman) : null;
    this.bowler = ballDetails.bowler ? parseInt(ballDetails.bowler) : null;
    this.runs = ballDetails.runs ? parseInt(ballDetails.runs) : 0;
    this.wicket = ballDetails.wicket ? parseInt(ballDetails.wicket) : 0;
    this.caught = ballDetails.caught ? parseInt(ballDetails.caught) : 0;
    this.runout = ballDetails.runout ? parseInt(ballDetails.runout) : 0;
    this.noball = ballDetails.noball ? parseInt(ballDetails.noball) : 0;
    this.wide = ballDetails.wide ? parseInt(ballDetails.wide) : 0;
    this.status = ballDetails.status ? ballDetails.status : DB_STATUS_MASTER.ACTIVE;
};

const validateUpdateBall = (ballDetails) => {

    const ballSchema = Joi.object({
        ball_id: Joi.number().required(),
        over_id: Joi.number().required(),
        batsman: Joi.number().required(),
        bowler: Joi.number().required(),
        runs: Joi.number().required(),
        wicket: Joi.number().allow("", null),
        caught: Joi.number().allow("", null),
        runout: Joi.number().allow("", null),
        noball: Joi.number().allow("", null),
        wide: Joi.number().allow("", null),
        status: Joi.number().allow("", null)
    });

    console.log(ballDetails);

    return ballSchema.validate(ballDetails);
};


module.exports = {
    Ball,
    validateBall,
    UpdateBall,
    validateUpdateBall
}