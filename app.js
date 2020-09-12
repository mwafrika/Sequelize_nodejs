import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import db from '../backend/config/database.json';
import expressLayout from 'express-ejs-layouts';
import userRoute from '../backend/routes/user';
import posts from '../backend/routes/post';
import path from 'path';
import session from 'express-session';
// const redis = require('redis');
// const redisStore = require('connect-redis')(session);
// const client  = redis.createClient();

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(session({
//   secret: 'keyboard',
//   resave: false,
//   cookie:{maxAge: 365 * 24 * 60 * 60 * 1000},
//   // store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
//   store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
//   saveUninitialized: false
//   }));
// setup engine
app.use(expressLayout);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use('/user',userRoute);
app.use('/posts', posts);
  
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The app is listening to the port ${port}`));