import connection from '../database/db.js'

async function selectIfUrlExists(url) {
    return connection.query('SELECT * FROM shortens WHERE url = $1', [url])
}

async function insertShortenUrl(shortUrl, url, userId) {
    connection.query('INSERT INTO shortens ("shortUrl", url, "userId") VALUES($1, $2, $3)', [shortUrl, url, userId])
}

async function selectShortenUrl(shortenId) {
    return connection.query('SELECT id, "shortUrl", url FROM shortens WHERE id = $1', [shortenId])
}

async function selectUrlToAccess(shortUrl) {
    return connection.query('SELECT url FROM shortens WHERE "shortUrl" = $1', [shortUrl])
}

async function updateVisitCount(shortUrl) {
    connection.query('UPDATE shortens SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1', [shortUrl])
}

async function selectUrlAndVerifyUser(userId, shortenId) {
    return connection.query('SELECT * FROM shortens WHERE "userId" = $1 AND id = $2', [userId, shortenId])
}

async function deleteUserUrl(shortenId) {
    connection.query('DELETE FROM shortens WHERE id = $1', [shortenId])
}

async function selectRanking() {
    return connection.query(`
        SELECT u.id, u.name, 
            COUNT(s."userId")::INTEGER AS "linksCount", 
            COALESCE(SUM(s."visitCount")::INTEGER, 0) AS "visitCount"
        FROM users u
        LEFT JOIN shortens s ON u.id = s."userId"
        GROUP BY u.id
        ORDER BY "visitCount" DESC
        LIMIT 10
    `)
}

export { 
    selectIfUrlExists, 
    insertShortenUrl, 
    selectShortenUrl, 
    selectUrlToAccess, 
    updateVisitCount, 
    selectUrlAndVerifyUser,
    deleteUserUrl,
    selectRanking
}