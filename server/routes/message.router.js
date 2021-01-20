const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const nodemailer = require('nodemailer');
require('dotenv').config();

//DELETE message for logged in user
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let id = req.params.id
  const sqlText = 'DELETE FROM message WHERE id=$1';
  pool.query(sqlText, [id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing DELETE query', err);
      res.sendStatus(500);
    });
});

// GET messages for logged in user
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "message" WHERE "sent_to_user_id" = $1 ORDER BY "time_sent";`;
  pool.query(queryText, [req.user.id]).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});//end GET

//Get email for specific user
router.get('/:id', rejectUnauthenticated, (req, res) => {
  let id = req.params.id;
  const sqlText = `SELECT email, email_messages FROM "user"
                    JOIN message ON message.sent_to_user_id = "user".id
                    WHERE "user".id = $1;`;
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


//POST message from logged in user
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('email', req.body);
  const data = req.body;
  //for nodemailer recipient
  const sent_to_user_email = req.body.sent_to_user_email.email
  //for nodemailer conditional
  const wantsEmail = req.body.sent_to_user_email.email_messages
  //for sent from in messages table
  const sent_from_username = req.user.username

  let queryText;
  //for support form which doesn't have a forum_id
  if (data.forum_id == 'null') {
    queryText = `INSERT INTO "message" (sent_to_user_id, sent_from_user_id, subject, message, mail_sent, sent_from_username)
   VALUES ($1, $2, $3, $4, $5, $6);`;
    pool.query(queryText, [data.sent_to_user_id, data.sent_from_user_id, data.subject, data.message, data.mail_sent, sent_from_username])
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing POST server query', err);
        res.sendStatus(500);
      });
  } else {
    queryText = `INSERT INTO "message" (sent_to_user_id, sent_from_user_id, forum_id, subject, message, mail_sent, sent_from_username)
          VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(queryText, [data.sent_to_user_id, data.sent_from_user_id, data.forum_id, data.subject, data.message, data.mail_sent, sent_from_username])
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing POST in message server', err);
        res.sendStatus(500);
      });
  }
//if checkmark is clicked they want email notification sent to them, if not just put in datbase 
//users can access it on message component for both options
  if (wantsEmail === true) {
    let password = process.env.password;
    const smtpTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'jfredericksen12@gmail.com',
        pass: password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    smtpTransport.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages!");
      }
    });
    const mailOptions = {
      from: `${data.email_address}`,
      to: sent_to_user_email,
      subject: `${data.subject}`,
      html: `<p>${data.message}</p>
              <p>Thank you, ${req.user.first_name}</p>`
    };
    smtpTransport.sendMail(mailOptions,
      (error, response) => {
        if (error) {
          console.log('error sending', error);
        } else {
          console.log('Success!');
        }
        smtpTransport.close();
        console.log(data)
        // const queryText = `INSERT INTO "message" (sent_to_user_id, sent_from_user_id, forum_id, subject, message, mail_sent, sent_from_username)
        // VALUES ($1, $2, $3, $4, $5, $6, $7);`;
        // pool.query(queryText, [data.sent_to_user_id, data.sent_from_user_id, data.forum_id, data.subject, data.message, data.mail_sent, sent_from_username])
        // .then(() => { res.sendStatus(201); })
        // .catch((err) => {
        //     console.log('Error completing POST server query', err);
        //     res.sendStatus(500);
        // });
      });
  } else {
    // const queryText = `INSERT INTO "message" (sent_to_user_id, sent_from_user_id, forum_id, subject, message, mail_sent, sent_from_username)
    //       VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    // pool.query(queryText, [data.sent_to_user_id, data.sent_from_user_id, data.forum_id, data.subject, data.message, data.mail_sent, sent_from_username])
    // .then(() => { res.sendStatus(201); })
    // .catch((err) => {
    //   console.log('Error completing POST in forum server', err);
    //   res.sendStatus(500);
    // });
  }

})

module.exports = router;


