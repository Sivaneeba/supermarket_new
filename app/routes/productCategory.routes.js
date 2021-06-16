const { authJwt } = require("../middleware");

module.exports = app => {
    const productCategories = require("../controllers/productCategory.controller.js");
  
    var router = require("express").Router();
    var route = require("express").Router();
  
    // Create a new Product Category
    router.post("/", productCategories.create);
  
    // Retrieve all Product Categories
    router.get("/", productCategories.findAll);  
    
    // Retrieve a single Product Category with id
    router.get("/:id", productCategories.findOne);
  
    // Update a Product Category with id
    router.put("/:id", productCategories.update);
  
    // Delete a Product Category with id
    router.delete("/:id", productCategories.delete);
  
    // Delete all Product Categories
    router.delete("/", productCategories.deleteAll);

    // Get the Products for a given Product Category 
    route.get("/:id", productCategories.findProductCategoryById);

    // Get all Product Categories include Products
    route.get("/", productCategories.findCategoriesAndProducts);
  
    app.use('/api/categories', router);
    app.use('/api/catProducts', route);
  };