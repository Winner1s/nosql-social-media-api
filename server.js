const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//callback function for post routes
router.post('/your-post-route', (req, res) => {
  res.send('POST request received');
});

const routes = require('./routes');
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

