const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET forum
router.get('/', (req, res) => {
// get all of listings from forum table in database
pool.query('SELECT * FROM "forum" ORDER BY date;').then((result) => {
    res.send(result.rows);
}).catch((error) => {
    console.log('Error GET support', error);
    res.sendStatus(500);
    });
});//end GET

//POST forum
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;