const mongoose = require('mongoose');

// Mongoose local connection to MongoDB
mongoose.connect('mongodb://localhost:27017/userThoughtDB', {
  
// useFindAndModify: false,  
  useNewUrlParser: true,
  useUnifiedTopology: true,
    
});

// Export connection 
module.exports = mongoose.connection;
