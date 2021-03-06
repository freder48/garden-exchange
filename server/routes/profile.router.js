const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//DELETE logged in user's listing on profile page 
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let id = req.params.id
  const sqlText = 'DELETE FROM forum WHERE id=$1';
  pool.query(sqlText, [id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing DELETE query', err);
      res.sendStatus(500);
    });
});

// This route will return logged in users listings for profile page
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "forum" WHERE "user_id" = $1 ORDER BY date DESC;`;
  pool.query(queryText, [req.user.id]).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});//end GET

//Get post details for specific user listing so we can update
router.get('/:id', rejectUnauthenticated, (req, res) => {
  let id = req.params.id;
  const sqlText = `SELECT * FROM forum WHERE id=$1`;
  //pool is the database, here we are sending the query to the database, running a query similar to a command in Postico
  pool.query(sqlText, [id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(`Error making database query in GET ${sqlText}`, error);
      res.sendStatus(500);
    });
}); // END GET Route

//PUT ROUTE - change listing details
router.put('/:id', rejectUnauthenticated, (req, res) => {
  let edit = req.body;
  console.log('req.body', req.body);
  let id = req.params.id; // identify which item to update
  console.log('id:', id);
  let sqlText = `UPDATE "forum" SET "have"=$1, "want" =$2, "location"=$3 WHERE "id"= $4;`
  pool.query(sqlText, [edit.have, edit.want, edit.location, id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error from db...', error);
      res.sendStatus(500);
    })
})//end PUT route

//PUT ROUTE - change email notifcation preference
router.put('/', rejectUnauthenticated, (req, res) => {
  console.log('put route', req.body)
  let id = req.body.id
  let sqlText;
  if(req.body.email_messages){
    sqlText=`UPDATE "user" SET email_messages=false WHERE id=$1`;
  } else {
    sqlText=`UPDATE "user" SET email_messages=true WHERE id=$1`;
  }
  pool.query(sqlText, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error from db...', error);
      res.sendStatus(500);
    })
})//end PUT route




module.exports = router;