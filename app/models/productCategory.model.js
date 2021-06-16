module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define("productCategory", {
      name: {
        type: DataTypes.STRING,
        required: true
      },
      description: {
        type: DataTypes.STRING
      }
    });
  
    return ProductCategory;
  };