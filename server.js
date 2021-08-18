const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
global.__basedir = __dirname;

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('uploads'));


const db = require("./app/models");
const Role = db.role;

db.sequelize.sync(
//   { force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//     initial();
// }
);

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
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});