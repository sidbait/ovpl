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



const updateTeam = async (teamDetails) => {
  try {

    const _query = `UPDATE teams SET team_name = '${teamDetails.team_name}', team_motto = '${teamDetails.team_motto}', team_owner = '${teamDetails.team_owner}', status = ${teamDetails.status} WHERE team_id = ${teamDetails.team_id}`

    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult;

  } catch (error) {
    throw error;
  }
}



const getAllTeams = async (filterData) => {
  try {

    let _query = `SELECT * FROM teams WHERE 1=1`;

    if (filterData.team_id) {
      _query += ` AND team_id = ${filterData.team_id}`
    }

    if (filterData.status) {
      _query += ` AND status = ${filterData.status}`
    }

    if (filterData.team_name) {
      _query += ` AND team_name LIKE '%${filterData.team_name}%'`
    }

    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult;

  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTeam,
  getAllTeams,
  updateTeam
}