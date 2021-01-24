const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET forum
router.get('/', rejectUnauthenticated, (req, res) => {
// get all of listings from forum table in database and display on Admin & ForumPage
pool.query('SELECT * FROM "forum" ORDER BY date DESC;').then((result) => {
    res.send(result.rows);
}).catch((error) => {
    console.log('Error GET support', error);
    res.sendStatus(500);
    });
});//end GET

//POST new forum listing
router.post('/', rejectUnauthenticated, (req, res) => {
  const listing = req.body;
  const queryText = `INSERT INTO "forum" ("have", "want", "location", "user_id")
                     VALUES ($1, $2, $3, $4);`;
  pool.query(queryText, [listing.have, listing.want, listing.location, listing.user_id])
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing POST in forum server', err);
      res.sendStatus(500);
    });

});

module.exports = router;