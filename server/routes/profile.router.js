const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

  //DELETE logged in usesr's listing on profile page 
  router.delete('/:id', rejectUnauthenticated, (req, res) => {
    let id = req.params.id
    const sqlText = 'DELETE FROM forum WHERE id=$1';
    pool.query(sqlText, [id])
    .then(() => {res.sendStatus(200);})
    .catch((err)=>{
      console.log('Error completing DELETE query', err);
      res.sendStatus(500);
    });
  });

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