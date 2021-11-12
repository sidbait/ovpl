const mysql = require('mysql');

const conn = mysql.createPool({
    connectionLimit: 12,
    host: process.env.SQL_HOST,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    multipleStatements: true
});

const executeQuery = async (dbQuery) => {
    return new Promise(async (resolve, reject) => {
        conn.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                reject(err.message);
            }
            connection.query(dbQuery, (error, results, fields) => {
                connection.release();
                if (error) {
                    console.error(error);
                    reject(error.message);
                }
                resolve(results);
            });
        });
    })
}

module.exports = {
    conn,
    executeQuery
}