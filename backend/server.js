const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const experimentRoutes = require('./routes/experiments');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/experiments', experimentRoutes);

mongoose.connect('mongodb://localhost:27017/ab_testing', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
