const db = require('../config/db')


const addMatch = async (matchDetails) => {
  try {

    const _query = `INSERT INTO matches(tournament_id, team_1, team_2, toss_won, toss_decision, wickets_per_inn, overs_per_inn, max_overs_bowler, mom, label, status) VALUES (${matchDetails.tournament_id}, ${matchDetails.team_1}, ${matchDetails.team_2},${matchDetails.toss_won}, '${matchDetails.toss_decision}', ${matchDetails.wickets_per_inn}, ${matchDetails.overs_per_inn}, ${matchDetails.max_overs_bowler}, ${matchDetails.mom}, '${matchDetails.label}', ${matchDetails.status})`;

    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult.insertId;

  } catch (error) {
    throw error;
  }
}



const updateMatch = async (matchDetails) => {
  try {

    const _query = `UPDATE matches SET tournament_id =${matchDetails.tournament_id}, team_1 = ${matchDetails.team_1}, team_2 = ${matchDetails.team_2}, toss_won = ${matchDetails.toss_won}, toss_decision = '${matchDetails.toss_decision}', wickets_per_inn = ${matchDetails.wickets_per_inn}, overs_per_inn = ${matchDetails.overs_per_inn}, max_overs_bowler = ${matchDetails.max_overs_bowler}, mom = ${matchDetails.mom}, label = '${matchDetails.label}', status = ${matchDetails.status} WHERE match_id = ${matchDetails.match_id}`

    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult;

  } catch (error) {
    throw error;
  }
}



const getAllMatches = async (filterData) => {
  try {

    let _query = `SELECT * FROM matches WHERE 1=1`;

    if (filterData.match_id) {
      _query += ` AND match_id = ${filterData.match_id}`
    }

    if (filterData.status) {
      _query += ` AND status = ${filterData.status}`
    }

    if (filterData.status) {
      _query += ` AND team_1 = ${filterData.team_1}`
    }

    if (filterData.status) {
      _query += ` AND team_2 = ${filterData.team_2}`
    }

    if (filterData.status) {
      _query += ` AND toss_won = ${filterData.toss_won}`
    }

    if (filterData.status) {
      _query += ` AND toss_decision = ${filterData.toss_decision}`
    }

    if (filterData.status) {
      _query += ` AND wickets_per_inn = ${filterData.wickets_per_inn}`
    }

    if (filterData.status) {
      _query += ` AND overs_per_inn = ${filterData.overs_per_inn}`
    }

    if (filterData.status) {
      _query += ` AND max_overs_bowler = ${filterData.max_overs_bowler}`
    }

    if (filterData.status) {
      _query += ` AND mom = ${filterData.mom}`
    }

    if (filterData.status) {
      _query += ` AND label = ${filterData.label}`
    }

    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult;

  } catch (error) {
    throw error;
  }
}

module.exports = {
  addMatch,
  getAllMatches,
  updateMatch
}