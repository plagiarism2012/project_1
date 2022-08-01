const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const adminroute = require('./routes/admin');
const employroute = require('./routes/employ');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// ap.use("///", function);

// employ informations databse
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));

app.listen(5000);

app.get('/', (req, res)=>{
    res.send("We are on home");
});

app.use('/admin', adminroute);
app.use('/employ', employroute);