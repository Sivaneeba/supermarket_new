const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("./app/middleware/passport");
global.__basedir = __dirname;
const db = require("./app/models");
const { user } = require("./app/models");
const Role = db.role;
const User = db.user;

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('uploads'));

app.use((req, resp, next) => {
  User.findByPk(1)
      .then(user => {
          req.user = user;
          next();
      })
      .catch(err => console.error(err));
});

db.sequelize.sync({ force: true }).then(() => { // drop existing tables and re-sync database
    console.log("Drop and re-sync db.");
    initial();
});


function initial() {
    Role.create({
      id: 1,
      name: "user"
    });   
    
    Role.create({
      id: 2,
      name: "admin"
    });
  }

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Supermarket Website application." });
});


require("./app/routes/productCategory.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/cart.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});