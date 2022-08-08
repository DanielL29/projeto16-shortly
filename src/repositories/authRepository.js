import connection from '../database/db.js'

async function selectIfEmailExists(email) {
    return connection.query('SELECT * FROM users WHERE email = $1', [email])
}

async function insertUser(name, email, password) {
    connection.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3)', [name, email, password])
}

async function selectUserUrls(id) {
    return connection.query(`
        SELECT u.id, u.name, COALESCE(SUM(s."visitCount")::INTEGER, 0) AS "visitCount", 
            COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', s.id,
                        'shortUrl', s."shortUrl",
                        'url', s.url,
                        'visitCount', s."visitCount"
                    ) ORDER BY s.id
                ) 
                FILTER (WHERE s.id IS NOT NULL), 
            '[]') as "shortenedUrls"
        FROM users u
        LEFT JOIN shortens s ON s."userId" = u.id
        WHERE u.id = $1
        GROUP BY u.id
    `, [id])
}


export { selectIfEmailExists, insertUser, selectUserUrls }