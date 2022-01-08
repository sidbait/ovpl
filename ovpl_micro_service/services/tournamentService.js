const db = require('../config/db')


const addTournament = async (tournamentDetails) => {
  try {

    const _query = `INSERT INTO tournaments(tournament_name , label , duration) VALUES ('${tournamentDetails.tournament_name}', '${tournamentDetails.label}', '${tournamentDetails.duration}')`;
    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult.insertId;

  } catch (error) {
    throw error;
  }
}



const updateTournament = async (tournamentDetails) => {
  try {

    const _query = `UPDATE tournaments SET tournament_name = '${tournamentDetails.tournament_name}', label = '${tournamentDetails.label}', duration = '${tournamentDetails.duration}' WHERE tournament_id = ${tournamentDetails.tournament_id}`

    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult;

  } catch (error) {
    throw error;
  }
}



const getAllTournaments = async (filterData) => {
  try {

    let _query = `SELECT * FROM tournaments WHERE 1=1`;

    if (filterData.team_id) {
      _query += ` AND tournament_id = ${filterData.tournament_id}`
    }

    if (filterData.status) {
      _query += ` AND label = ${filterData.label}`
    }

    if (filterData.status) {
      _query += ` AND duration = ${filterData.duration}`
    }

    if (filterData.team_name) {
      _query += ` AND tournament_name LIKE '%${filterData.tournament_name}%'`
    }

    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult;

  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTournament,
  getAllTournaments,
  updateTournament
}