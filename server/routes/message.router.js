const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


  // This route will return logged in users messages
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "message" WHERE "sent_to_user_id" = $1;`;
  pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
});//end GET

//POST message
router.post('/', rejectUnauthenticated, (req, res) => {
  const message = req.body;
  console.log('req.body', message)
  const queryText = `INSERT INTO "message" (sent_to_user_id, sent_from_user_id, forum_id, message)
                     VALUES ($1, $2, $3, $4);`;
  pool.query(queryText, [message.sent_to_user_id, message.sent_from_user_id, message.forum_id, message.message])
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing POST in forum server', err);
      res.sendStatus(500);
    });

});

module.exports = router;
