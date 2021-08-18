const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.productCategories = require("./productCategory.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.carts = require("./cart.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);
db.orderItems = require("./order-item.model.js")(sequelize, Sequelize);
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);


db.productCategories.hasMany(db.products, { as: "products" });
db.products.belongsTo(db.productCategories, {
  foreignKey: "productCategoryId",
  as: "productCategory",
});

db.user.hasMany(db.carts);
db.carts.belongsTo(db.user);

db.products.hasMany(db.carts);
db.carts.belongsTo(db.products);

db.orders.belongsTo(db.user);
db.user.hasMany(db.orders);

db.orders.belongsToMany(db.products,{
  through: db.orderItems
});
db.products.belongsToMany(db.orders,{
  through: db.orderItems
});

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

module.exports = db;