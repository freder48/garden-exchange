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
router.post('/', (req, res) => {
  console.log('email', req.body);
  const data = req.body;

  if (req.user.email_messages){

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
      to: 'jfredericksen12@gmail.com',
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
          const queryText = `INSERT INTO "message" (sent_to_user_id, sent_from_user_id, forum_id, subject, message, mail_sent)
          VALUES ($1, $2, $3, $4, $5, $6);`;
          pool.query(queryText, [data.sent_to_user_id, data.sent_from_user_id, data.forum_id, data.subject, data.message, data.mail_sent])
              .then(() => { res.sendStatus(201); })
              .catch((err) => {
                  console.log('Error completing POST server query', err);
                  res.sendStatus(500);
              });
      });
  } else {
    const queryText = `INSERT INTO "message" (sent_to_user_id, sent_from_user_id, forum_id, subject, message, mail_sent)
          VALUES ($1, $2, $3, $4, $5, $6);`;
          pool.query(queryText, [data.sent_to_user_id, data.sent_from_user_id, data.forum_id, data.subject, data.message, data.mail_sent])
  .then(() => { res.sendStatus(201); })
  .catch((err) => {
    console.log('Error completing POST in forum server', err);
    res.sendStatus(500);
  });
  }

})

module.exports = router;

// console.log('req.user', req.user.email_messages)
// const message = req.body;
// console.log('req.body', message)
// const queryText = `INSERT INTO "message" (sent_to_user_id, sent_from_user_id, forum_id, message)
//                    VALUES ($1, $2, $3, $4);`;
// pool.query(queryText, [message.sent_to_user_id, message.sent_from_user_id, message.forum_id, message.message])
//   .then(() => { res.sendStatus(201); })
//   .catch((err) => {
//     console.log('Error completing POST in forum server', err);
//     res.sendStatus(500);
//   });
