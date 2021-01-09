const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

  //DELETE message for logged in user
  router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id
    const sqlText = 'DELETE FROM message WHERE id=$1';
    pool.query(sqlText, [id])
    .then(() => {res.sendStatus(200);})
    .catch((err)=>{
      console.log('Error completing DELETE query', err);
      res.sendStatus(500);
    });
  });

  // GET messages for logged in user
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "message" WHERE "sent_to_user_id" = $1;`;
  pool.query(queryText, [req.user.id]).then((result) => {
      res.send(result.rows);
  }).catch((error) => {
      console.log(error);
      res.sendStatus(500);
  });
});//end GET

//POST message from logged in user
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
