module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
      name: {
        type: DataTypes.STRING,
        required: true
      },
      description: {
        type: DataTypes.STRING,
        required: true
      },
      price: {
        type: DataTypes.DOUBLE,
        required: true
      },
      count: {
        type: DataTypes.INTEGER,
        required: true
      },
      image: {
        type: DataTypes.STRING,
      },
      productCategoryId: {
        type: DataTypes.INTEGER,
        required: true
      }
    });
  
    return Product;
  };