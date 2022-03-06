import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import * as researcherCRUD from './researchers/researcher-crud-mongo';
import * as auth from './user/auth';
import path from 'path';

dotenv.config();

// Non null assertion operator (!) tells
//compiler that, although it cannot verify this,
// process.env.MONGO_DB will be defined
mongoose.connect(process.env.MONGO_DB!, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Connecting to Mongo');
  }
});

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Required to push site to prod via Heroku
// Routes static file requests to the client
app.use(express.static(path.join(__dirname, 'client', 'build')));

// Custom Routes Related To Researchers
app.get('/api/get_all_researchers', researcherCRUD.getAllResearchers);
app.get('/api/get_researcher/:id', researcherCRUD.getResearcher);
app.post('/api/create_researcher', researcherCRUD.createResearcher);
app.delete('/api/delete_researcher', researcherCRUD.deleteResearcher);
app.delete('/api/delete_researchers', researcherCRUD.deleteResearchers);
app.put('/api/edit_researcher', researcherCRUD.editResearcher);

// Custom Routes Related To Auth/Users
app.post('/auth/login', auth.attemptLogin);
app.post('/auth/register', auth.register);
app.post('/auth/logout', auth.signOut);

// Also needed to push site to prod via Heroku
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
