module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define("cart", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: Sequelize.INTEGER    
    
    });
  
    return Cart;
  };