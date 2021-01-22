const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the gallerys 
 */
router.get("/", (req, res) => {
  let queryString = `SELECT * FROM "gallery";`;
  pool
    .query(queryString)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

//get specific user's gallery
router.get('/user', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "gallery" WHERE "user_id" = $1 ORDER BY id;`;
  pool.query(queryText, [req.user.id]).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});//end GET

/**
 * Add an gallery for the logged in user to the shelf
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  console.log("req.user", req.user);
  let sqlText = `INSERT INTO "gallery" ("description", "url", "user_id")
    VALUES ($1, $2, $3);`;
  pool
    .query(sqlText, [req.body.description, req.body.url, req.user.id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error adding gallery to DB", error);
      res.sendStatus(500);
    });
});

//DELETE gallery for logged in user
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let id = req.params.id
  const sqlText = 'DELETE FROM gallery WHERE id=$1';
  pool.query(sqlText, [id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing DELETE query', err);
      res.sendStatus(500);
    });
});





module.exports = router;