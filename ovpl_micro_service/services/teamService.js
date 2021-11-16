const db = require('../config/db')


const addTeam = async (teamDetails) => {
  try {

    const _query = `INSERT INTO teams(team_name, team_owner, team_motto, status) VALUES ('${teamDetails.team_name}', '${teamDetails.team_owner}', '${teamDetails.team_motto}', ${teamDetails.status})`;

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