const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// //GET forum
router.get('/', rejectUnauthenticated, (req, res) => {
// get all of listings from forum table in database
pool.query('SELECT * FROM "support" ORDER BY time_sent;').then((result) => {
    res.send(result.rows);
}).catch((error) => {
    console.log('Error GET support', error);
    res.sendStatus(500);
    });
});//end GET

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

  //DELETE message for logged in user
  router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id
    const sqlText = 'DELETE FROM support WHERE id=$1';
    pool.query(sqlText, [id])
    .then(() => {res.sendStatus(200);})
    .catch((err)=>{
      console.log('Error completing DELETE query', err);
      res.sendStatus(500);
    });
  });


module.exports = router;