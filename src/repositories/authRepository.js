import connection from '../database/db.js'

async function selectIfEmailExists(email) {
    return connection.query('SELECT * FROM users WHERE email = $1', [email])
}

async function insertUser(name, email, password) {
    connection.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3)', [name, email, password])
}

async function selectUserUrls(id) {
    return connection.query(`
        SELECT u.id, u.name, SUM(s."visitCount")::INTEGER AS "visitCount", (
            SELECT JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', s.id,
                    'shortUrl', s."shortUrl",
                    'url', s.url,
                    'visitCount', s."visitCount"
                )
            ) FROM shortens s WHERE s."userId" = u.id
        ) as "shortenedUrls"
        FROM users u, shortens s
        WHERE s."userId" = u.id
        AND u.id = $1
        GROUP BY s."userId", u.id
    `, [id])
}


export { selectIfEmailExists, insertUser, selectUserUrls }