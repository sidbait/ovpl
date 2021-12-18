const db = require('../config/db')


const addPlayer = async (playerDetails) => {
  try {

    const _query = `INSERT INTO players(player_name, player_bat, team_id, player_bowl, player_wicket, player_captain, status) VALUES ('${playerDetails.player_name}', '${playerDetails.player_bat}', '${playerDetails.team_id}', '${playerDetails.player_bowl}', '${playerDetails.player_wicket}', '${playerDetails.player_captain}', ${playerDetails.status})`;

    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult.insertId;

  } catch (error) {
    throw error;
  }
}



const updatePlayer = async (playerDetails) => {
  try {

    const _query = `UPDATE players SET player_name = '${playerDetails.player_name}', player_bat = '${playerDetails.player_bat}', team_id = '${playerDetails.team_id}', player_bowl = '${playerDetails.player_bowl}', player_wicket = '${playerDetails.player_wicket}', player_captain = '${playerDetails.player_captain}', status = ${playerDetails.status} WHERE player_id = ${playerDetails.player_id}`

    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult;

  } catch (error) {
    throw error;
  }
}



const getAllPlayers = async (filterData) => {
  try {

    let _query = `SELECT * FROM players WHERE 1=1`;

    if (filterData.player_id) {
      _query += ` AND player_id = ${filterData.player_id}`
    }

    if (filterData.status) {
      _query += ` AND status = ${filterData.status}`
    }

    if (filterData.player_name) {
      _query += ` AND player_name LIKE '%${filterData.player_name}%'`
    }

    if (filterData.player_bat) {
      _query += ` AND player_bat = ${filterData.player_bat}`
    }

    if (filterData.player_bowl) {
      _query += ` AND player_bowl = ${filterData.player_bowl}`
    }

    if (filterData.player_wicket) {
      _query += ` AND player_wicket = ${filterData.player_wicket}`
    }

    if (filterData.player_captain) {
      _query += ` AND player_captain = ${filterData.player_captain}`
    }

    const queryResult = await db.executeQuery(_query);
    console.log(queryResult);
    return queryResult;

  } catch (error) {
    throw error;
  }
}

module.exports = {
  addPlayer,
  getAllPlayers,
  updatePlayer
}