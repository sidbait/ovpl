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

module.exports = {
  addTeam
}