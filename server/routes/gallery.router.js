const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the gallerys on the shelf
 */
router.get("/", (req, res) => {
  // YOUR CODE HERE
  // Joins the two tables by species_name and class_name by using the class_id with the class table id
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

/**
 * Delete an gallery if it's something the logged in user added
 */
router.delete("/:id/:user_id", rejectUnauthenticated, (req, res) => {
  console.log("req.user", req.user);
  console.log("req.body:", req.body);
  console.log("req.params:", req.params);
  let sqlText = `DELETE from "gallery" WHERE $1 = $2 AND id=$3;`;
  pool
    .query(sqlText, [req.params.user_id, req.user.id, req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error deleting gallery from DB", error);
      res.sendStatus(500);
    });
});

/**
 * Update an gallery if it's something the logged in user added
 */
router.put("/:id/:user_id", rejectUnauthenticated, (req, res) => {
  console.log('Req.body', req.body)
  const query =
    'UPDATE "gallery" SET "description"=$1 WHERE $2 = $3 AND id=$4';
  pool
    .query(query, [req.body.state.description, req.user.id, req.body.userId, req.body.galleryId])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});


module.exports = router;