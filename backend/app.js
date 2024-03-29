import express from 'express';
const app = express();
import { connect } from 'mongoose';
import userRoutes from './routes/user';
import cityRoutes from './routes/city';
import competencyRoutes from './routes/competency';
import * as bodyParser  from "body-parser";
import path from "path";

connect('mongodb+srv://birametgod:JYhW2K6qkOAjAGAk@cluster0-c7tiq.mongodb.net/superMalt', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`connected to database`);
  })
  .catch(() => {
    console.log('Connection failed !');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('./images')));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS,PUT');
    next();
  });

app.use("/api/user", userRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/competency", competencyRoutes);

export default app;