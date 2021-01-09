const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

  // This route will return logged in users listings
  router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * FROM "forum" WHERE "user_id" = $1;`;
    pool.query(queryText, [req.user.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
  });//end GET



module.exports = router;