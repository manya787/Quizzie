// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const userRoute = require('./routes/User');
// const examQuestionsRoute = require('./routes/ExamQuestions');
// const userExamsRoute = require('./routes/UserExams');
// const examRoute = require('./routes/Exam');
// const connectToDatabase = require('./db');
// require('dotenv').config();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// connectToDatabase();

// app.use('/users', userRoute);
// app.use('/examquestions', examQuestionsRoute);
// app.use('/exam', examRoute);
// app.use('/userexams', userExamsRoute);

// app.listen(process.env.PORT, () => {
//     console.log(`Server started on ${process.env.PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/User');
const examQuestionsRoute = require('./routes/ExamQuestions');
const userExamsRoute = require('./routes/UserExams');
const examRoute = require('./routes/Exam');
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to the database directly
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to the database");
    
    // Set up routes after successful database connection
    app.use('/users', userRoute);
    app.use('/examquestions', examQuestionsRoute);
    app.use('/exam', examRoute);
    app.use('/userexams', userExamsRoute);

    // Start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server started on ${process.env.PORT}`);
    });
  })
  .catch(error => {
    console.error("Error connecting to the database:", error);
  });
