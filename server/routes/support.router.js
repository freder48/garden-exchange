const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// //GET forum
// router.get('/', rejectUnauthenticated, (req, res) => {
// // get all of listings from forum table in database
// pool.query('SELECT * FROM "forum" ORDER BY date;').then((result) => {
//     res.send(result.rows);
// }).catch((error) => {
//     console.log('Error GET support', error);
//     res.sendStatus(500);
//     });
// });//end GET

//POST forum
router.post('/', rejectUnauthenticated, (req, res) => {
  const support = req.body;
  const queryText = `INSERT INTO "support" ("sent_from_user_id", "subject", "message")
                     VALUES ($1, $2, $3);`;
  pool.query(queryText, [support.sent_from_user_id, support.subject, support.message])
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing POST in support server', err);
      res.sendStatus(500);
    });

});

module.exports = router;