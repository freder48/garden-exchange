const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
  // GET route code here
});


//POST message
router.post('/', (req, res) => {
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
