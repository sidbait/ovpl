const db = require('../config/db')


const addBall = async (ballDetails) => {
    try {

        const _query = `INSERT INTO ball_by_ball(over_id,runs,wicket,caught,runout,noball,wide,status) VALUES (${ballDetails.over_id}, ${ballDetails.runs}, ${ballDetails.wicket},${ballDetails.caught}, ${ballDetails.runout}, ${ballDetails.noball}, ${ballDetails.wide},${ballDetails.status})`;

        const queryResult = await db.executeQuery(_query);
        console.log(queryResult);
        return queryResult.insertId;

    } catch (error) {
        throw error;
    }
}

const checkOverExists = async (over_id) => {
    try {

        const _query = `SELECT COUNT(*) AS count FROM overs WHERE over_id = ${over_id}`;
        const queryResult = await db.executeQuery(_query);
        console.log(queryResult);
        return queryResult[0].count;

    } catch (error) {
        throw error;
    }
}

const checkOverCompleted = async (over_id) => {
    try {

        const _query = `SELECT COUNT(*) AS count FROM ball_by_ball WHERE status = 2 AND over_id = ${over_id} AND noball = 0 AND wide = 0`;
        const queryResult = await db.executeQuery(_query);
        console.log(queryResult);
        return queryResult[0].count;

    } catch (error) {
        throw error;
    }
}

const checkValidBatsman = async (ballDetails, overDetails) => {
    try {

        const batsmanDetailsQuery = `SELECT * FROM players WHERE player_id = ${ballDetails.batsman}`;
        const batsmanDetailsQueryResult = await db.executeQuery(batsmanDetailsQuery);
        const batsmanDetails = batsmanDetailsQueryResult[0];
        const inningsDetails = getInnings(overDetails.team_1, overDetails.team_2, overDetails.toss_won, overDetails.toss_decision);

        if (batsmanDetails.team_id != inningsDetails[overDetails.inning.toString()]) {
            return false;
        }

        return true;

    } catch (error) {
        throw error;
    }
}

const checkValidBowler = async (ballDetails, overDetails) => {
    try {

        const bowlerDetailsQuery = `SELECT * FROM players WHERE player_id = ${ballDetails.bowler}`;
        const bowlerDetailsQueryResult = await db.executeQuery(bowlerDetailsQuery);
        const bowlerDetails = bowlerDetailsQueryResult[0];
        const inningsDetails = getInnings(overDetails.team_1, overDetails.team_2, overDetails.toss_won, overDetails.toss_decision);

        if (bowlerDetails.team_id == inningsDetails[overDetails.inning.toString()]) {
            return false;
        }

        return true;

    } catch (error) {
        throw error;
    }
}

const getInnings = (team_1, team_2, toss_won, toss_decision) => {
    try {

        console.log({ team_1, team_2, toss_won, toss_decision });
        const winningTeam = toss_won;
        const losingTeam = team_1 == toss_won ? team_2 : team_1;

        const defaultResponse = {
            1: team_1,
            2: team_2
        };

        if (toss_decision == 'BAT') {
            defaultResponse['1'] = winningTeam;
            defaultResponse['2'] = losingTeam;
            return defaultResponse;
        }

        defaultResponse['1'] = losingTeam;
        defaultResponse['2'] = winningTeam;
        return defaultResponse;

    } catch (error) {
        throw error;
    }
}

const getMatchDetailsByOver = async (over_id) => {
    try {
        const matchDetailsQuery = `SELECT * FROM overs O INNER JOIN matches M ON O.match_id = M.match_id WHERE O.over_id = ${over_id}`;
        const matchDetailsQueryResult = await db.executeQuery(matchDetailsQuery);
        const matchDetails = matchDetailsQueryResult[0];
        console.log("overDetails", matchDetails);
        return matchDetails;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    addBall,
    checkOverExists,
    checkOverCompleted,
    checkValidBatsman,
    checkValidBowler,
    getMatchDetailsByOver
}
