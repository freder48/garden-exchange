
const express = require('express');
require('dotenv').config();
const forumRouter = require('./routes/forum.router');
const messageRouter = require('./routes/message.router');
const profileRouter = require('./routes/profile.router');
const galleryRouter = require('./routes/gallery.router');

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/forum', forumRouter);
app.use('/api/message', messageRouter);
app.use('/api/profile', profileRouter);
app.use('/api/gallery', galleryRouter);
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
